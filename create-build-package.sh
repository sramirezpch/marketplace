#!/bin/bash

if test -d "/package"; then
    echo "package directory exists"
else
    mkdir package
fi

contracts=($(find ./build/contracts -name "*.sol" | xargs))

counter=0

while [[ $counter -lt ${#contracts[@]} ]]; do
    # Splits the path by the '/' delimeter and passes the last element
    # Then it splits the string by the "." to get the contract name
    contractName=$(echo ${contracts} | cut -d"/" -f4 | cut -d"." -f1)

    cp ${contracts[counter]}/${contractName}.json ./package
    ((counter++))
done