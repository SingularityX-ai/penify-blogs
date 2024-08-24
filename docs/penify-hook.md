---
layout: doc
---

# Penify-Hook Tutorial

Penify-Hook is a powerful tool designed to automate the generation of inline code documentation for your codebase. By integrating it with your Git Pre-commit/post-commit workflow, you can ensure that your code is well-documented with minimal effort. This tutorial will walk you through the process of setting up and using Penify-Hook.

*Note: You do not need to install your Penify in your GitHub Repository to use this feature*

**Penify-hook features:**

1. Tracking Git Changes and generate Code Documentation for the same
2. Generate Documentation for one file
3. Generate Documentation for all the files in a folder
4. 


## 1. Installing Penify-Hook

The first step to using Penify-Hook is to install it. Open your terminal and run the following command:

```bash
pip install penify-cli
```

## 2. Setting Up Your API Token

To use Penify-Hook, you need an API token. Follow these steps to set it up:

1. **Obtain Your API Token:**
   - Visit [dashboard.penify.dev](https://dashboard.penify.dev) and log in.
   - Navigate to the API section and generate your API token.

   ![Obtain API Token](https://via.placeholder.com/600x300?text=Obtain+API+Token+from+Penify+Dashboard)

2. **Set Your API Token as an Environment Variable:**

   Add the token to your environment variables by running the following command:

   ```bash
   export PENIFY_API_TOKEN=<YOUR_API_TOKEN>
   ```

   Replace `<YOUR_API_TOKEN>` with the token you obtained from the dashboard.

   ![Set API Token](https://via.placeholder.com/600x300?text=Set+API+Token+in+Terminal)

## 4. Using Penify-Hook <a name="using-penify-cli"></a>

Penify-Hook offers several ways to generate documentation for your code. You can track Git changes, configure a post-commit hook, or generate documentation for specific files or entire folders.

### 4.1 Tracking Git Changes <a name="tracking-git-changes"></a>

Penify-Hook can automatically generate docstrings for any modifications you make to your code. To do this, simply run:

```bash
penify-cli -l <FILE_PATH>
```

This command will analyze the specified file, generate docstrings for the modified functions and classes, and update the file.

![Tracking Git Changes](https://via.placeholder.com/600x300?text=Tracking+Git+Changes)

### 4.2 Configuring the Post-Commit Hook <a name="configuring-the-post-commit-hook"></a>

One of the most powerful features of Penify-Hook is its ability to integrate directly with your Git workflow.

#### **Step 1: Install the Post-Commit Hook**

Navigate to the root directory of your Git repository and run:

```bash
penify-cli --install -f <YOUR_FOLDER_PATH>
```

This command installs the post-commit hook, which will trigger after every commit to generate and update docstrings automatically.

![Install Post-Commit Hook](https://via.placeholder.com/600x300?text=Install+Post-Commit+Hook)

#### **Step 2: Commit Your Code**

After making changes to your code, commit your changes as usual:

```bash
git commit -m "Updated some functions"
```

Penify-Hook will automatically generate and update the docstrings for any modified files.

![Commit Your Code](https://via.placeholder.com/600x300?text=Commit+Your+Code)

#### **Step 3: Uninstall the Post-Commit Hook (Optional)**

If you ever need to remove the post-commit hook, you can do so with:

```bash
penify-cli --uninstall -f <YOUR_FOLDER_PATH>
```

![Uninstall Post-Commit Hook](https://via.placeholder.com/600x300?text=Uninstall+Post-Commit+Hook)

### 4.3 Generating Documentation for a Full Repository <a name="generating-documentation-for-a-full-repository"></a>

Penify-Hook can generate documentation for all files in a repository, regardless of whether Git is installed:

```bash
penify-cli -cf <COMPLETE_FOLDER_PATH>
```

This command will scan the specified folder and generate docstrings for all files within it.

![Generate Documentation for Full Repo](https://via.placeholder.com/600x300?text=Generate+Documentation+for+Full+Repo)

### 4.4 Generating Documentation for a Single File <a name="generating-documentation-for-a-single-file"></a>

If you want to generate docstrings for a specific file, use:

```bash
penify-cli -l <FILE_PATH>
```

This command will analyze the file, generate the required docstrings, and update the file.

![Generate Documentation for Single File](https://via.placeholder.com/600x300?text=Generate+Documentation+for+Single+File)

## 5. Conclusion <a name="conclusion"></a>

Penify-Hook is a versatile tool that helps you maintain high-quality documentation in your projects with minimal effort. By integrating it with your Git workflow, you can automatically generate docstrings for your codebase, ensuring that your code remains well-documented as it evolves.

We hope this tutorial has helped you understand how to set up and use Penify-Hook effectively. Happy coding!

---

This tutorial provides a step-by-step guide to using Penify-Hook, complete with images to help visualize each step of the process.