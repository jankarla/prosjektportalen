<#

.SYNOPSIS
This script will upgrade Prosjektportalen

.DESCRIPTION
Use the required -Url param to specify the target site collection

.EXAMPLE
./Upgrade.ps1 -Url https://puzzlepart.sharepoint.com/sites/prosjektportalen

.LINK
https://github.com/Puzzlepart/prosjektportalen

#>

Param(
    [Parameter(Mandatory = $true, HelpMessage = "Where do you want to install the Project Portal?")]
    [string]$Url,
    [Parameter(Mandatory = $false, HelpMessage = "Where do you want to install the required resources?")]
    [string]$AssetsUrl,
    [Parameter(Mandatory = $false, HelpMessage = "Where do you want to copy standard data from?")]
    [string]$DataSourceSiteUrl,
    [Parameter(Mandatory = $false, HelpMessage = "Do you want to handle PnP libraries and PnP PowerShell without using bundled files?")]
    [switch]$SkipLoadingBundle,
    [Parameter(Mandatory = $false, HelpMessage = "Stored credential from Windows Credential Manager")]
    [string]$GenericCredential,
    [Parameter(Mandatory = $false, HelpMessage = "Use Web Login to connect to SharePoint. Useful for e.g. ADFS environments.")]
    [switch]$UseWebLogin,
    [Parameter(Mandatory = $false, HelpMessage = "Use the credentials of the current user to connect to SharePoint. Useful e.g. if you install directly from the server.")]
    [switch]$CurrentCredentials,
    [Parameter(Mandatory = $false, HelpMessage = "PowerShell credential to authenticate with")]
    [System.Management.Automation.PSCredential]$PSCredential,
    [Parameter(Mandatory = $false, HelpMessage = "Installation Environment. If SkipLoadingBundle is set, this will be ignored")]
    [ValidateSet('SharePointPnPPowerShell2013','SharePointPnPPowerShell2016','SharePointPnPPowerShellOnline')]
    [string]$Environment = "SharePointPnPPowerShellOnline",    
    [Parameter(Mandatory = $false, HelpMessage = "Do you want to skip installing assets (in case you already have installed assets previously)?")]
    [switch]$SkipAssets,
    [Parameter(Mandatory = $false, HelpMessage = "Do you want to skip installing third party scripts (in case you already have installed third party scripts previously)?")]
    [switch]$SkipThirdParty,
    [ValidateSet('None','File','Host')]
    [string]$Logging = "File",
    [Parameter(Mandatory = $false, HelpMessage = "Use Force if you want to install packages even if version check fails")]
    [switch]$Force,
    [Parameter(Mandatory = $false)]
    [Hashtable]$Parameters
)

. ./SharedFunctions.ps1

# Loads bundle if switch SkipLoadingBundle is not present
if (-not $SkipLoadingBundle.IsPresent) {
    LoadBundle -Environment $Environment
}

# Sets up PnP trace log
if($Logging -eq "File") {
    $execDateTime = Get-Date -Format "yyyyMMdd_HHmmss"
    Set-PnPTraceLog -On -Level Debug -LogFile "pplog-$execDateTime.txt"
}
elseif($Logging -eq "Host") {
    Set-PnPTraceLog -On -Level Debug
}
else {
    Set-PnPTraceLog -Off
}

# Handling credentials
if ($PSCredential -ne $null) {
    $Credential = $PSCredential
} elseif ($GenericCredential -ne $null -and $GenericCredential -ne "") {
    $Credential = Get-PnPStoredCredential -Name $GenericCredential -Type PSCredential 
} elseif ($Credential -eq $null -and -not $UseWebLogin.IsPresent -and -not $CurrentCredentials.IsPresent) {
    $Credential = (Get-Credential -Message "Please enter your username and password")
}

if (-not $AssetsUrl) {
    $AssetsUrl = $Url
}

if (-not $DataSourceSiteUrl) {
    $DataSourceSiteUrl = $Url
}

$Connection = $null
try {
    $Connection = Connect-SharePoint -Url $Url
} catch {
    Write-Error $Error[0]
    Write-Error "An error occured connecting to $Url. Aborting."
    exit 1
}
$CurrentVersion = ParseVersion -VersionString (Get-PnPPropertyBag -Key pp_version)

# {package-version} will be replaced with the actual version by 'gulp release'
$InstallVersion = ParseVersion -VersionString "{package-version}"

if ($InstallVersion -gt $CurrentVersion -or $Force.IsPresent) {
    Write-Host "############################################################################" -ForegroundColor Green
    Write-Host "" -ForegroundColor Green
    Write-Host "Upgrading Prosjektportalen from version $($CurrentVersion) to $($InstallVersion)" -ForegroundColor Green
    Write-Host "Maintained by Puzzlepart @ https://github.com/Puzzlepart/prosjektportalen" -ForegroundColor Green
    Write-Host "" -ForegroundColor Green
    Write-Host "Upgrade URL:`t`t$Url" -ForegroundColor Green
    Write-Host "" -ForegroundColor Green
    Write-Host "Note: The upgrade requires site collection admin and term store admin permissions" -ForegroundColor Yellow
    Write-Host "" -ForegroundColor Green
    Write-Host "############################################################################" -ForegroundColor Green

    try {
        if ($InstallVersion.Major -gt $CurrentVersion.Major -or $InstallVersion.Minor -gt $CurrentVersion.Minor) {
            $Connection = Connect-SharePoint $Url -Connection $Connection
            Write-Host "Deploying pre-upgrade packages.." -ForegroundColor Green -NoNewLine
            $Language = Get-WebLanguage -ctx (Get-PnPContext)
            $upgradePkgs = Get-ChildItem -Path "./@upgrade/$($CurrentVersion.Major).$($CurrentVersion.Minor)_$($InstallVersion.Major).$($InstallVersion.Minor)/pre-*-$($Language).pnp"
            foreach ($pkg in $upgradePkgs) {
                Apply-PnPProvisioningTemplate $pkg.FullName
            }
            Write-Host "DONE" -ForegroundColor Green
        }
        Write-Host "Removing existing custom actions.. " -ForegroundColor Green -NoNewLine
        $Connection = Connect-SharePoint $Url -Connection $Connection
        Get-PnPCustomAction -Scope Web | ForEach-Object { Remove-PnPCustomAction -Identity $_.Id -Scope Web -Force }
        Write-Host "DONE" -ForegroundColor Green
    }
    catch {
        Write-Host
        Write-Host "Error removing existing custom actions from $Url" -ForegroundColor Red 
        Write-Host $error[0] -ForegroundColor Red
        exit 1 
    }

    .\Install.ps1 -Url $Url -AssetsUrl $AssetsUrl -DataSourceSiteUrl $DataSourceSiteUrl -Environment $Environment -Upgrade -SkipData -SkipDefaultConfig -SkipTaxonomy -PSCredential $Credential -Connection $Connection -UseWebLogin:$UseWebLogin -CurrentCredentials:$CurrentCredentials -SkipLoadingBundle -SkipAssets:$SkipAssets -SkipThirdParty:$SkipThirdParty -Logging $Logging -Parameters $Parameters

    if ($InstallVersion.Major -gt $CurrentVersion.Major -or $InstallVersion.Minor -gt $CurrentVersion.Minor) {
        $Connection = Connect-SharePoint $Url -Connection $Connection
        Write-Host "Deploying upgrade packages.." -ForegroundColor Green -NoNewLine
        $Language = Get-WebLanguage -ctx (Get-PnPContext)
        $upgradePkgs = Get-ChildItem -Path "./@upgrade/$($CurrentVersion.Major).$($CurrentVersion.Minor)_$($InstallVersion.Major).$($InstallVersion.Minor)/*-$($Language).pnp" -Exclude "pre-*.pnp"
        foreach ($pkg in $upgradePkgs) {
            Apply-PnPProvisioningTemplate $pkg.FullName
        }
        Write-Host "DONE" -ForegroundColor Green
    } 
    Write-Host "No additional upgrade steps required. Upgrade complete." -ForegroundColor Green
} else {    
    Write-Host "You're already on the same or newer version of Project Portal" -ForegroundColor Yellow
}
Disconnect-PnPOnline