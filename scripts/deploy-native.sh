#!/bin/bash

echo "Which deployment would you like to run?"
echo "1) TestFlight"
echo "2) Production"
read -p "Enter your choice (1 or 2): " choice

case $choice in
    1)
        echo "Running TestFlight deployment..."
        bun run eas build --platform ios --profile testflight --local --output=./app-testflight.abd && bun run eas submit -p ios --path ./app-testflight.abd
        ;;
    2)
        echo "Running Production deployment..."
        bun run eas build --platform ios --profile production --local --output=./app-prod.abd && bun run eas submit -p ios --path ./app-prod.abd
        ;;
    *)
        echo "Invalid choice. Please run the script again and select either 1 or 2."
        exit 1
        ;;
esac
