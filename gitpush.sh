#!/bin/bash
commitMessage="Update TSV files $(date +"%Y-%m-%d")"
echo $commitMessage
git add ./assets/data/*.tsv
git commit -m "$commitMessage"
git push origin master