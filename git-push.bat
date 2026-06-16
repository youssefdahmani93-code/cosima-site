@echo off
cd /d d:\cosima-site
git add -A
git commit -m "Update free shipping text to Arabian Gulf Countries and remove Flat Rate options"
git push origin main
echo DONE
del "%~f0"
