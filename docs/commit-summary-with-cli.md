---
layout: doc
title: "Streamline Your Git Workflow: Mastering Semantic Commit Messages with Penify-CLI"
description: "Learn how to use Penify-CLI's Commit Summary Generator to automate the creation of meaningful, semantic commit messages. This guide covers installation, usage, customization options, and best practices for integrating Penify-CLI into your Git workflow, helping you save time and improve commit consistency."
keywords: Penify-CLI, commit summary generator, semantic commit messages, Git workflow, automated commits, AI-powered commits, developer tools, version control, commit message consistency, code documentation, time-saving tools, Git best practices
---

# Simplify Git Commits with Penify-CLI's Commit Summary Generator

Good commit messages are crucial for any project. They help you and your team understand why changes were made. But writing clear, informative messages can be time-consuming. That's where Penify-CLI comes in.

![Penify commits](../public/images/commit-details-msg.png)

## What is Penify-CLI commit summary?

Penify-CLI is a tool that automatically generates meaningful commit messages adhering to [Semantic commit message standard](https://docs.penify.dev/docs/semantic-commit-messages). It looks at your code changes and creates a summary that explains what you did and why.


## How to use Penify to generate Semantic Commit Message?

### Install

First things first, let's get Penify-CLI installed:

```bash
pip install penify-cli
```

### Setup Environment Variables

- `PENIFY_API_TOKEN`: You can set this environment variable with your API token to avoid passing it as an argument each time. Here is the [tutorial](https://docs.penify.dev/docs/Creating-API-Keys-in-Penify.html) on setting env variables

```bash
export PENIFY_API_TOKEN=skl_ai_******
```

---

### Generate a commit summary

  1. Go to your repository

```bash
cd path/to/your/repo
```

  2. Make some changes and stage your changes

```bash
git add /all/your/files
```

  3. Only after you perform `git add`, Penify can pick your changes to automatically generate AI summary.

  ```bash
  penify-cli commit
  ```

This command will:

- Look at your code changes
- Create a commit message
- Make the commit

![Penify commit docs](../public/images/commt-summary-1.gif)

## Customizing Your Commit

1. Want to provide additional context to LLMs? Use the `-m` flag:

    ```bash
    penify-cli commit -m "Focus on login feature"
    ```

    While generating commit summary it will prioritizes your commit message

2. Need to edit the message? Use the `-e` flag:

    ```bash
    penify-cli commit -e True
    ```

    This opens your text editor so you can make changes.

    ![Penify commit docs](../public/images/commit-summary-2.gif)

## Why Use Penify-CLI?

1. **Save Time**: Write less, explain more.
2. **Be Consistent**: All commit messages follow the same style.
3. **Don't Miss Details**: The AI catches things you might forget.
4. **Learn**: Improve your own commit writing skills.

## Tips for Using Penify-CLI

1. Always review the generated message before committing.
2. Use your own message (with `-m`) to add extra context.
3. Make it part of your regular Git workflow.

## Are there any other tools?

Github Co-pilot has such feature but it’s quite buggy and doesn’t generate “semantic commit messages”
   
## Conclusion

Penify-CLI makes writing good commit messages easy. It saves you time and helps keep your project history clear. Give it a try on your next commit!

![Penify commit docs](../public/images/similing-git-dev.webp)
