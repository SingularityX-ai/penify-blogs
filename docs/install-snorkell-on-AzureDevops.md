---
layout: doc
---

# 🛠️ How to Install Snorkell.ai on AzureDevops?

Installing Snorkell.ai on your AzureDevops repository or organization is a straightforward process. This guide will walk you through the steps to integrate Snorkell.ai, ensuring your project's documentation is automatically generated and updated.

## 📋 Pre-requisites

- An `AzureDevops` account.
- A `PAT` Token
- A `Repository` in which you want to install

### 🧭 Step-by-Step Installation Guide

1. **Open your Repository**
   - Open your web browser and navigate to your repository[AzureDevOps](https://dev.azure.com/).
   - In my case I will be opening this repository [xeno-rat](https://dev.azure.com/Snorkell-ai/_git/xeno-rat).

2. **Create a YAML File in your Repository**
   - Create a folder `.pipelines`
   - Create a file `snorkell-auto-doc.yaml`
   - Add the following contents in the file.
     - NOTE: Modify the `trigger` and `BRANCH_NAME` as desired.
     - NOTE: Modify the `pool` as desired.
  
    ```yml
    trigger:
    - master # It could be "master", "main" or any branch on which you want to run this pipeline.
    
    pr: none
    
    variables:
      pythonVersion: '3.x'
      # Direct secret variable reference removed to ensure proper handling in the steps
      BRANCH_NAME: 'master' # Ensure this matches your intended branch for documentation generation
    
    pool:
      name: my-personal-computer #You can use your "pool" name. 
    
    strategy:
      matrix:
        Python39:
          python.version: '3.9'
    
    steps:
    # this will install SnorkellClient to run on your Repository
    - script: |
        curl -o run_doc_gen.py https://raw.githubusercontent.com/SingularityX-ai/snorkell-documentation-client/main/src/azure_devops.py?q=3
        python -m pip install requests
      displayName: 'Install Snorkell.ai Client'
    
    - script: |
        ESCAPED_COMMIT_MSG=$(printf '%s\n' "$(Build.SourceVersionMessage)" | jq -R -s -c .)
        STRIPPED_COMMIT_MSG=$(echo "$ESCAPED_COMMIT_MSG" | sed 's/ //g' | sed 's/\\n//g')
        echo "STRIPPED_COMMIT_MSG=$STRIPPED_COMMIT_MSG" >> $(Build.SourcesDirectory)/.env
        echo "COMMIT_MSG - $STRIPPED_COMMIT_MSG"
      displayName: 'Extract Commit Message'
    
    - script: |
        ORG_URL=$(System.TeamFoundationCollectionUri)
        ORG_NAME=$(echo $ORG_URL | cut -d'/' -f4)
        REPO_NAME=$(echo $(Build.Repository.Name) | cut -d'/' -f2)
        echo "ORG_NAME=$ORG_NAME" >> $(Build.SourcesDirectory)/.env
        echo "REPO_NAME=$REPO_NAME" >> $(Build.SourcesDirectory)/.env
        echo "ORG_NAME - $ORG_NAME"
        echo "REPO_NAME - $REPO_NAME"
        echo "BRANCH_NAME - $BRANCH_NAME"
      displayName: 'Extract Repository Information'
    
    - script: |
        export $(cat $(Build.SourcesDirectory)/.env | xargs)
        python -u run_doc_gen.py
      displayName: 'Run Snorkell Client'
      env:
        # Correctly passing secrets as environment variables
        SNORKELL_API_KEY: $(SNORKELL_API_KEY)
        PAT_TOKEN: $(PAT_TOKEN)
        # You need to generate PAT token so that Snorkell can read your code changes and generate documentation.
        BRANCH_NAME: $(BRANCH_NAME)
        GITHUB_SHA: $(Build.SourceVersion)
        COMMIT_MSG: $(STRIPPED_COMMIT_MSG)
        REPO_NAME: $(REPO_NAME)
        ORG_NAME: $(ORG_NAME)
        PROJECT_NAME: $(PROJECT_NAME)
    ```

3. **Create Pipeline for your Repository**
   - You can follow this video on how to create Snorkell and Azure Devops integration.
   - Contains information on
     - Pipeline Creation via YAML file
     - PAT Token Generation
     - SNORKELL API Key generation
     - How to set the variables in the Pipeline
  
    [![Snorkell Azure Devops Installation](https://i.imgur.com/NFsm5RV.png)](https://www.youtube.com/watch?v=iyN4GUW60ag)

4. **See Snorkell in Action: When Repository contents are modified**
   - Check the below video to watch Snorkell AI Documentation Generation in Action on Code Changes

   [![Snorkell Azure Devops AI Documentation Generation](https://i.imgur.com/yGwBvSP.png)](https://www.youtube.com/watch?v=3ufN2ooeKT4)

5. **Snorkell in Action: Generate Documentation of entire Repository**
   - Once you finish Step 4, Snorkell will automatically get configured for your Repository.
   - You will see the Repository information in [Snorkell Dashboard](https://dashboard.snorkell.ai/documentation-generator-dashboard).
   - To generate Documentation for your entire Repository.
   - Click on your Repository
   - You will be redirected to a your repository page
   - Click on "Generate Documentation for your Repository"
   - Repository Documentation generation has now started
     - Note: In case of "Freemium" repository, only top 10 files will be documented.
     - If you want to Document your entire repository - you need to buy Credits from the [Payments Page](https://dashboard.snorkell.ai/profile/payments).
   - I will add the Demo for the same
   - For now you can always refer this demo from time(0:57)

      [![Snorkell Full Repo Demo](https://i.imgur.com/4IDR1Mp.png)](https://youtu.be/vpdpxTdco0Q?t=47).