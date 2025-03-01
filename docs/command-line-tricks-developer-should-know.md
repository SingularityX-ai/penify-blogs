---
layout: doc
title: "20 Git Command-Line Tricks Every Developer Should Know"
description: "Master Git with these 20 command-line tricks that every developer should know. Enhance your workflow, from basic configurations to advanced operations, and boost your productivity."
keywords: Git, Git commands, command line, version control, developer tools, software development, Git tricks, Git tips, coding productivity, workflow optimization
author: Suman Saurabh
linkedInUrl: https://www.linkedin.com/in/ssumansaurabh/
image: https://media.licdn.com/dms/image/v2/D5603AQEDru6Q4UkzEg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1681498321113?e=1730332800&v=beta&t=PM0PsCMZs4Ar0TIweuSdqU-P7kuWLm9gmEZ_spGFDsw
---

# 20 Essential Git Command-Line Tricks for Developers

Git is an indispensable version control system that every developer should master. While graphical user interfaces can simplify certain tasks, the command line provides unmatched control, flexibility, and efficiency. In this blog post, we’ll dive into 20 Git command-line tricks that can enhance your workflow, whether you’re working solo or collaborating with a team. From basic configurations to advanced operations, these tricks will help you navigate Git like a pro.

---

## 1. Configure Your Git Identity
Set up your name and email so your commits are properly attributed:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

**💡 Tip:** Use `--local` instead of `--global` to apply settings to a specific repository only.

---

## 2. Undo the Last Commit (Soft Reset)
Made a mistake in your last commit? Undo it without losing your changes:

```bash
git reset --soft HEAD~1
```

This keeps your changes staged, allowing you to fix and recommit them.

---

## 3. Amend the Last Commit
Forgot a file or want to tweak the commit message? Amend your last commit:

```bash
git add .
git commit --amend -m "Updated commit message"
```

This replaces the previous commit with your updated changes.

---

## 4. Stash Changes Temporarily
Need to switch branches but aren’t ready to commit? Stash your changes:

```bash
git stash
```

Retrieve them later with:

```bash
git stash pop
```

---

## 5. Visualize Commit History
See your project’s commit history in a graphical format:

```bash
git log --graph --oneline --all
```

This provides a clear, concise view of branches and merges.

---

## 6. Change Commit Author
Update the author of your most recent commit:

```bash
git commit --amend --author="New Author <newauthor@example.com>"
```

**Note:** This only affects the last commit; use other methods for older commits.

---

## 7. Diff Staged Changes
Check what’s staged before committing:

```bash
git diff --staged
```

This shows the differences between your staged changes and the last commit.

---

## 8. Find Bugs with Bisect
Pinpoint the commit that introduced a bug using binary search:

```bash
git bisect start
git bisect bad  # Current commit is bad
git bisect good <commit-hash>  # A known good commit
```

Git will guide you through the history to find the culprit.

---

## 9. Interactive Rebase for Clean History
Rewrite your commit history for a tidier log:

```bash
git rebase -i HEAD~3
```

This lets you edit, squash, or reorder the last three commits.

---

## 10. Cherry-Pick Commits
Bring a specific commit from another branch into your current one:

```bash
git cherry-pick <commit-hash>
```

Perfect for applying targeted fixes or features.

---

## 11. List All Branches
View all local and remote branches:

```bash
git branch -a
```

This helps you keep track of what’s available in your repository.

---

## 12. Clean Untracked Files
Remove untracked files and directories cluttering your working directory:

```bash
git clean -fd
```

**💡 Tip:** Use `-n` for a dry run to preview what will be deleted.

---

## 13. Set Upstream Branch
Link your local branch to a remote branch for easier pushing and pulling:

```bash
git branch --set-upstream-to=origin/main
```

---

## 14. Squash Commits
Combine multiple commits into a single, cleaner commit:

```bash
git rebase -i HEAD~n  # Replace 'n' with the number of commits
```

Follow the interactive prompts to squash your commits.

---

## 15. View File at Specific Commit
Inspect a file’s contents from a past commit:

```bash
git show <commit-hash>:path/to/file
```

This is great for reviewing historical versions.

---

## 16. Update .gitignore
Forgot to ignore certain files? Update `.gitignore` and untrack them:

```bash
echo "node_modules/" >> .gitignore
git rm -r --cached node_modules/
git commit -m "Update .gitignore"
```

---

## 17. Revert a Commit
Undo changes from a specific commit without altering history:

```bash
git revert <commit-hash>
```

This creates a new commit that reverses the specified changes.

---

## 18. Fetch Metadata Only
Check what’s available on the remote without downloading:

```bash
git fetch --dry-run
```

Useful for planning your next steps.

---

## 19. Blame a File
See who last modified each line in a file:

```bash
git blame path/to/file
```

A handy tool for tracking down the source of changes.

---

## 20. Reset a File
Discard local changes to a specific file and revert to the last commit:

```bash
git checkout -- path/to/file
```

---

## Conclusion
Mastering these 20 Git command-line tricks can transform your development workflow, giving you greater control and efficiency. Whether you’re configuring your environment, managing branches, or debugging with tools like `git bisect`, these commands are invaluable.

To take your Git skills even further, consider the art of writing clear, meaningful commit messages. Tools like `penify-cli` can streamline this process—simply run `penify-cli commit` to generate contextual commit messages based on your staged changes, saving time and ensuring consistency.

Happy coding! 🚀