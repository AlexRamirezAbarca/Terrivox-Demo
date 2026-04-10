$ErrorActionPreference = "Stop"

Set-Location "c:\Users\shank\Downloads\Terrivox-20260318T003744Z-1-001\Terrivox\terrivox-app\src\app"

# Fix Auth Move
if (!(Test-Path "(auth)\login")) { New-Item -ItemType Directory -Force -Path "(auth)\login" }
if (Test-Path "login\page.tsx") {
    Move-Item -Path "login\page.tsx" -Destination "(auth)\login\" -Force
    Remove-Item -Recurse -Force "login"
}

# Fix Dashboard Move
if (!(Test-Path "(dashboard)\dashboard")) { New-Item -ItemType Directory -Force -Path "(dashboard)\dashboard" }
if (!(Test-Path "(dashboard)\agenda")) { New-Item -ItemType Directory -Force -Path "(dashboard)\agenda" }
if (!(Test-Path "(dashboard)\subida")) { New-Item -ItemType Directory -Force -Path "(dashboard)\subida" }

if (Test-Path "dashboard\page.tsx") {
    Move-Item -Path "dashboard\page.tsx" -Destination "(dashboard)\dashboard\" -Force
    Remove-Item -Recurse -Force "dashboard"
}
if (Test-Path "agenda\page.tsx") {
    Move-Item -Path "agenda\page.tsx" -Destination "(dashboard)\agenda\" -Force
    Remove-Item -Recurse -Force "agenda"
}
if (Test-Path "subida\page.tsx") {
    Move-Item -Path "subida\page.tsx" -Destination "(dashboard)\subida\" -Force
    Remove-Item -Recurse -Force "subida"
}
