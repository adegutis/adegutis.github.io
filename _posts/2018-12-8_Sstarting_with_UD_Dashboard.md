---
layout: post
title: Getting Started with the PowerShell Universal Dashboard
---



```PowerShell
$SqlQuery = "
    SELECT * 
    FROM heatmap 
    INNER JOIN servers ON servers.ServerName = heatmap.ServerName
    WHERE servers.Active = 1
        and heatmap.LastCheck = (
            SELECT MAX(h.LastCheck) 
            FROM heatmap AS h 
            WHERE heatmap.ServerName = h.ServerName
        )
"

$SqlQuerySplat = @{
    SQLInstance = $SQLInstance
    Database    = $Database
    Query       = $SQLQuery 
}
    $AllResults = Invoke-DbaQuery @SqlQuerySplat

$SQLQuery = "
select *
    from storage inner join servers on servers.servername = storage.servername 
    where servers.active = 'True' and 
        Storage.LastCheck = (
            select max(s.LastCheck) from storage as s where storage.ServerName = s.ServerName
        )
        and Storage.LastCheck > DATEADD(HOUR, -1, GETDATE())
"
$SqlQuerySplat = @{
    SQLInstance = $SQLInstance
    Database    = $Database
    Query       = $SQLQuery 
}
$LunResults += Invoke-DbaQuery @SqlQuerySplat
```

# The Data



# Standardizing the Data

```PowerShell
$Results = @()

if ($Name -eq 'CPU' -or $Name -eq 'All') {
    #region CPU metrics
    Write-Verbose 'Getting CPU metrics'
    $Results += [pscustomobject]@{
        Name         = 'CPU'
        ChartType    = 'Doughnut'
        ChartOptions = [pscustomobject]@{Legend = $True; RefreshRate = 30; Stacked = $True}
        Color        = 'Red'
        Label        = '90-100%'
        Value        = ($AllResults | Where-Object {$_.CPU -ge 90}).count
        Value2       = $null
    }
    $Results += [pscustomobject]@{
        Name         = 'CPU'
        ChartType    = 'Doughnut'
        ChartOptions = [pscustomobject]@{Legend = $True; RefreshRate = 30; Stacked = $True}
        Color        = 'Yellow'
        Label        = '80-89%'
        Value        = ($AllResults | Where-Object {$_.CPU -ge 80 -and $_.CPU -lt 90}).count
        Value2       = $Null
    }
    $Results += [pscustomobject]@{
        Name         = 'CPU'
        ChartType    = 'Doughnut'
        ChartOptions = [pscustomobject]@{Legend = $True; RefreshRate = 30; Stacked = $True}
        Color        = 'LightGreen'
        Label        = '30-79%'
        Value        = ($AllResults | Where-Object {$_.CPU -ge 30 -and $_.CPU -lt 80}).count
        Value2       = $Null
    }
    $Results += [pscustomobject]@{
        Name         = 'CPU'
        ChartType    = 'Doughnut'
        ChartOptions = [pscustomobject]@{Legend = $True; RefreshRate = 30; Stacked = $True}
        Color        = 'Green'
        Label        = '0-29%'
        Value        = ($AllResults | Where-Object {$_.CPU -lt 30}).count
        Value2       = $Null
    }
    #endregion CPU metrics
}
```

<details>
  <summary>Click to expand and see the entire block</summary>

```PowerShell
$Results = @()

if ($Name -eq 'CPU' -or $Name -eq 'All') {
    #region CPU metrics
    Write-Verbose 'Getting CPU metrics'
    $Results += [pscustomobject]@{
        Name         = 'CPU'
        ChartType    = 'Doughnut'
        ChartOptions = [pscustomobject]@{Legend = $True; RefreshRate = 30; Stacked = $True}
        Color        = 'Red'
        Label        = '90-100%'
        Value        = ($AllResults | Where-Object {$_.CPU -ge 90}).count
        Value2       = $null
    }
    $Results += [pscustomobject]@{
        Name         = 'CPU'
        ChartType    = 'Doughnut'
        ChartOptions = [pscustomobject]@{Legend = $True; RefreshRate = 30; Stacked = $True}
        Color        = 'Yellow'
        Label        = '80-89%'
        Value        = ($AllResults | Where-Object {$_.CPU -ge 80 -and $_.CPU -lt 90}).count
        Value2       = $Null
    }
    $Results += [pscustomobject]@{
        Name         = 'CPU'
        ChartType    = 'Doughnut'
        ChartOptions = [pscustomobject]@{Legend = $True; RefreshRate = 30; Stacked = $True}
        Color        = 'LightGreen'
        Label        = '30-79%'
        Value        = ($AllResults | Where-Object {$_.CPU -ge 30 -and $_.CPU -lt 80}).count
        Value2       = $Null
    }
    $Results += [pscustomobject]@{
        Name         = 'CPU'
        ChartType    = 'Doughnut'
        ChartOptions = [pscustomobject]@{Legend = $True; RefreshRate = 30; Stacked = $True}
        Color        = 'Green'
        Label        = '0-29%'
        Value        = ($AllResults | Where-Object {$_.CPU -lt 30}).count
        Value2       = $Null
    }
    #endregion CPU metrics
}

if ($Name -eq 'RAM' -or $Name -eq 'All') {
    #region RAM metrics
    Write-Verbose "Getting RAM Metrics"
    $Results += [pscustomobject]@{
        Name         = 'RAM'
        ChartType    = 'Doughnut'
        ChartOptions = [pscustomobject]@{Legend = $True; RefreshRate = 40; Stacked = $True}
        Color        = 'Red'
        Label        = '90-100%'
        Value        = ($AllResults | Where-Object {$_.RAM -ge 90}).count
        Value2       = $Null
    }
    $Results += [pscustomobject]@{
        Name         = 'RAM'
        ChartType    = 'Doughnut'
        ChartOptions = [pscustomobject]@{Legend = $True; RefreshRate = 40; Stacked = $True}
        Color        = 'Yellow'
        Label        = '80-89%'
        Value        = ($AllResults | Where-Object {$_.RAM -ge 80 -and $_.RAM -lt 90}).count
        Value2       = $Null
    }
    $Results += [pscustomobject]@{
        Name         = 'RAM'
        ChartType    = 'Doughnut'
        ChartOptions = [pscustomobject]@{Legend = $True; RefreshRate = 40; Stacked = $True}
        Color        = 'LightGreen'
        Label        = '30-79%'
        Value        = ($AllResults | Where-Object {$_.RAM -ge 30 -and $_.RAM -lt 80}).count
        Value2       = $Null
    }
    $Results += [pscustomobject]@{
        Name         = 'RAM'
        ChartType    = 'Doughnut'
        ChartOptions = [pscustomobject]@{Legend = $True; RefreshRate = 40; Stacked = $True}
        Color        = 'Green'
        Label        = '0-29%'
        Value        = ($AllResults | Where-Object {$_.RAM -lt 30}).count
        Value2       = $Null
    }
    #endregion RAM metrics
}

if ($Name -eq 'System Drive' -or $Name -eq 'All') {
    #region System Drive metrics
    Write-Verbose "Getting System Drive Metrics"
    $Results += [pscustomobject]@{
        Name         = 'System Drive'
        ChartType    = 'Doughnut'
        ChartOptions = [pscustomobject]@{Legend = $True; RefreshRate = 60; Stacked = $True}
        Color        = 'Red'
        Label        = '95-100%'
        Value        = ($AllResults | Where-Object {$_.DiskFreePerc -lt 5}).count
        Value2       = $Null
    }
    $Results += [pscustomobject]@{
        Name         = 'System Drive'
        ChartType    = 'Doughnut'
        ChartOptions = [pscustomobject]@{Legend = $True; RefreshRate = 60; Stacked = $True}
        Color        = 'Yellow'
        Label        = '90-94%'
        Value        = ($AllResults | Where-Object {$_.DiskFreePerc -ge 5 -and $_.DiskFreePerc -lt 11}).count
        Value2       = $Null
    }
    $Results += [pscustomobject]@{
        Name         = 'System Drive'
        ChartType    = 'Doughnut'
        ChartOptions = [pscustomobject]@{Legend = $True; RefreshRate = 60; Stacked = $True}
        Color        = 'LightGreen'
        Label        = '80-89%'
        Value        = ($AllResults | Where-Object {$_.DiskFreePerc -ge 11 -and $_.DiskFreePerc -lt 21}).count
        Value2       = $Null
    }
    $Results += [pscustomobject]@{
        Name         = 'System Drive'
        ChartType    = 'Doughnut'
        ChartOptions = [pscustomobject]@{Legend = $True; RefreshRate = 60; Stacked = $True}
        Color        = 'Green'
        Label        = '0-79%'
        Value        = ($AllResults | Where-Object {$_.DiskFreePerc -ge 20}).count
        Value2       = $Null
    }
}

#endregion System Drive metrics
if ($Name -eq 'SQL LUN' -or $Name -eq 'All') {
    #region SQL LUN metrics
        $Results += [pscustomobject]@{
        Name         = 'SQL LUN'
        ChartType    = 'Doughnut'
        ChartOptions = [pscustomobject]@{Legend = $True; RefreshRate = 300; Stacked = $True}
        Color        = 'Red'
        Label        = '90-100%'
        Value        = ($LunResults | Where-Object {$_.PercentFree -lt 5}).count
        Value2       = $Null
    }
    $Results += [pscustomobject]@{
        Name         = 'SQL LUN'
        ChartType    = 'Doughnut'
        ChartOptions = [pscustomobject]@{Legend = $True; RefreshRate = 300; Stacked = $True}
        Color        = 'Yellow'
        Label        = '90-94%'
        Value        = ($LunResults | Where-Object {$_.PercentFree -ge 5 -and $_.PercentFree -lt 11}).count
        Value2       = $Null
    }
    $Results += [pscustomobject]@{
        Name         = 'SQL LUN'
        ChartType    = 'Doughnut'
        ChartOptions = [pscustomobject]@{Legend = $True; RefreshRate = 300; Stacked = $True}
        Color        = 'LightGreen'
        Label        = '80-89%'
        Value        = ($LunResults | Where-Object {$_.PercentFree -ge 11 -and $_.PercentFree -lt 21}).count
        Value2       = $Null
    }
    $Results += [pscustomobject]@{
        Name         = 'SQL LUN'
        ChartType    = 'Doughnut'
        ChartOptions = [pscustomobject]@{Legend = $True; RefreshRate = 300; Stacked = $True}
        Color        = 'Green'
        Label        = '0-79%'
        Value        = ($LunResults | Where-Object {$_.PercentFree -ge 20}).count
        Value2       = $Null
    }
    #endregion SQL LUN metrics
}
```
</details>

# Structuring the data in JSON

<details>
  <summary>Click to expand and see the entire block</summary>

```json
[
    {
        "Name": "CPU",
        "ChartType": "Doughnut",
        "ChartOptions": {
            "Legend": true,
            "RefreshRate": 30,
            "Stacked": false
        },
        "Thresholds": {
            "1": {
                "Color": "Red",
                "Condition": "($AllResults | Where-Object {$_.CPU -ge 90}).count",
                "Label": "90-100%"
            },
            "2": {
                "Color": "Yellow",
                "Condition": "($AllResults | Where-Object {$_.CPU -ge 80 -and $_.CPU -lt 90}).count",
                "Label": "80-89%"
            },
            "3": {
                "Color": "LightGreen",
                "Condition": "($AllResults | Where-Object {$_.CPU -ge 30 -and $_.CPU -lt 80}).count",
                "Label": "30-79%"
            },
            "4": {
                "Color": "Green",
                "Condition": "($AllResults | Where-Object {$_.CPU -lt 30}).count",
                "Label": "0-29%"
            }
        }
    },
    {
        "Name": "RAM",
        "ChartType": "Doughnut",
        "ChartOptions": {
            "Legend": true,
            "RefreshRate": 40,
            "Stacked": false
        },
        "Thresholds": {
            "1": {
                "Color": "Red",
                "Condition": "($AllResults | Where-Object {$_.RAM -ge 90}).count",
                "Label": "90-100%"
            },
            "2": {
                "Color": "Yellow",
                "Condition": "($AllResults | Where-Object {$_.RAM -ge 80 -and $_.RAM -lt 90}).count",
                "Label": "80-89%"
            },
            "3": {
                "Color": "LightGreen",
                "Condition": "($AllResults | Where-Object {$_.RAM -ge 30 -and $_.RAM -lt 80}).count",
                "Label": "30-79%"
            },
            "4": {
                "Color": "Green",
                "Condition": "($AllResults | Where-Object {$_.RAM -lt 30}).count",
                "Label": "0-29%"
            }
        }
    },
    {
        "Name": "System Drive",
        "ChartType": "Doughnut",
        "ChartOptions": {
            "Legend": true,
            "RefreshRate": 60,
            "Stacked": false
        },
        "Thresholds": {
            "1": {
                "Color": "Red",
                "Condition": "($AllResults | Where-Object {$_.DiskFreePerc -lt 5}).count",
                "Label": "95-100%"
            },
            "2": {
                "Color": "Yellow",
                "Condition": "($AllResults | Where-Object {$_.DiskFreePerc -ge 5 -and $_.DiskFreePerc -lt 11}).count",
                "Label": "90-94%"
            },
            "3": {
                "Color": "LightGreen",
                "Condition": "($AllResults | Where-Object {$_.DiskFreePerc -ge 11 -and $_.DiskFreePerc -lt 21}).count",
                "Label": "80-89%"
            },
            "4": {
                "Color": "Green",
                "Condition": "($AllResults | Where-Object {$_.DiskFreePerc -ge 20}).count",
                "Label": "0-79%"
            }
        }
    },
    {
        "Name": "SQL LUN",
        "ChartType": "Doughnut",
        "ChartOptions": {
            "Legend": true,
            "RefreshRate": 300,
            "Stacked": false
        },
        "Thresholds": {
            "1": {
                "Color": "Red",
                "Condition": "($LunResults | Where-Object {$_.PercentFree -lt 5}).count",
                "Label": "90-100%"
            },
            "2": {
                "Color": "Yellow",
                "Condition": "($LunResults | Where-Object {$_.PercentFree -ge 5 -and $_.PercentFree -lt 11}).count",
                "Label": "90-94%"
            },
            "3": {
                "Color": "LightGreen",
                "Condition": "($LunResults | Where-Object {$_.PercentFree -ge 11 -and $_.PercentFree -lt 21}).count",
                "Label": "80-89%"
            },
            "4": {
                "Color": "Green",
                "Condition": "($LunResults | Where-Object {$_.PercentFree -ge 20}).count",
                "Label": "0-79%"
            }
        }
    }
```
</details>

# PowerShell Function to Read the JSON Data

```PowerShell
Function New-TbsUdChartDoughnut {
    [cmdletbinding()]
    Param()

    if (!$DataPath) {
        $DataPath = '.\TBSUniversalDashboard\Data'
    }

    if (!$Results) {
        $Results = @()
    }

    $ChartDefinitions = Get-Content $DataPath\Chart-Doughnut.json | ConvertFrom-Json

    foreach ($Chart in $ChartDefinitions) {
        $ChartOptions = @{
            Legend      = $Chart.ChartOptions.Legend
            RefreshRate = $Chart.ChartOptions.RefreshRate
            Stacked     = $Chart.ChartOptions.Stacked
        }
        $AllDefinitions = $Chart.Thresholds |
            Get-Member |
            Where-Object {$_.MemberType -eq 'NoteProperty'} |
            Select-Object Name
        for ($Count = 1; $Count -le $AllDefinitions.count; $Count++) {
            $Data = Invoke-Expression $Chart.Thresholds.$Count.Condition
            $Results += [pscustomobject]@{
                Name         = $Chart.Name
                ChartType    = $Chart.ChartType
                ChartOptions = $ChartOptions
                Color        = $Chart.Thresholds.$Count.Color
                Label        = $Chart.Thresholds.$Count.Label
                Value        = $Data
                Value2       = $null
            }
        }
    }

    Write-Output $Results
}
```

My spouse ask "Can't you combine the data so it doesn't repeat?"
"Yes, I can!" is what I said to my self a couple hours later.

