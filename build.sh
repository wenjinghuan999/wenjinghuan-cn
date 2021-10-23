#!/bin/sh

# build notebooks
if [ -d "doc/notebook" ]
then
    rm -rf doc/notebook
fi
mkdir doc/notebook
cp -r notebook/imgs doc/notebook/
node convert_notebooks.js
