$files = Get-ChildItem -Path . -Recurse -Include *.tsx,*.ts,*.jsx,*.js -Exclude node_modules,.next,.git
$count = 0
foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -ErrorAction SilentlyContinue
    if ($null -ne $content) {
        $newContent = [regex]::Replace($content, '\s*dark:[^\s"''`]+', '')
        if ($content -cne $newContent) {
            Set-Content -Path $file.FullName -Value $newContent -NoNewline
            Write-Host "Updated $($file.FullName)"
            $count++
        }
    }
}
Write-Host "Total files updated: $count"
