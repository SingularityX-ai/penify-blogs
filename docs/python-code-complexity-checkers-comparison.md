---
title: "⚖️ Python Code Complexity Checkers: A Comprehensive Comparison"
description: "A detailed comparison of popular Python code complexity checkers including Radon, McCabe, Lizard, Wily, and Flake8. Learn the strengths, weaknesses, and unique features of each tool to choose the best one for your project."
publishedAt: "2025-04-30"
updatedAt: "2025-04-30"
isPublished: true
tags:
  - Python
  - Code Quality
  - Static Analysis
  - Complexity
  - Best Practices
layout: doc
author: Suman Saurabh
linkedInUrl: https://www.linkedin.com/in/ssumansaurabh/
image: https://www.penify.dev/banner.png
---

# ⚖️ Python Code Complexity Checkers: A Comprehensive Comparison

> "The most complex functions are the ones most likely to contain bugs, and the hardest to maintain. Choose your complexity checker wisely."

If you're serious about code quality, you've likely heard about cyclomatic complexity and other code metrics. But with so many Python complexity checkers available, which one should you choose?

In this post, we'll compare the most popular Python complexity analysis tools—Radon, McCabe, Lizard, Wily, and Flake8—to help you decide which best fits your needs.

---

## 📊 Complexity Metrics: A Quick Refresher

Before diving into the tools, let's briefly revisit what we're measuring:

- **Cyclomatic Complexity**: The number of independent paths through code (decision points + 1)
- **Cognitive Complexity**: How difficult code is for humans to understand
- **Maintainability Index**: A composite measure of maintainability based on multiple factors
- **Raw Metrics**: Lines of code, comments ratio, etc.

Different tools prioritize different metrics, which is important to consider when making your choice.

---

## 🔎 The Contenders: Feature Comparison

| Feature | Radon | McCabe | Lizard | Wily | Flake8 |
|---------|-------|--------|--------|------|--------|
| **Cyclomatic Complexity** | ✓ | ✓ | ✓ | ✓ | ✓ (plugin) |
| **Cognitive Complexity** | ✗ | ✗ | ✓ | ✗ | ✗ |
| **Maintainability Index** | ✓ | ✗ | ✓ | ✓ | ✗ |
| **Raw Metrics** | ✓ | ✗ | ✓ | ✓ | ✗ |
| **Historical Analysis** | ✗ | ✗ | ✗ | ✓ | ✗ |
| **IDE Integration** | ✓ | ✓ | ✓ | ✗ | ✓ |
| **CI/CD Integration** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Configurable Thresholds** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Output Formats** | Text, JSON, XML | Text | Text, XML, HTML | Text, CSV, HTML | Text |

Now let's explore each tool in detail.

---

## 1️⃣ Radon: The All-Rounder

[Radon](https://radon.readthedocs.io/) is perhaps the most comprehensive Python complexity checker, supporting multiple metrics and visualization options.

### Strengths:

- **Multiple Metrics**: Analyzes cyclomatic complexity (CC), maintainability index (MI), raw metrics, and Halstead metrics
- **Flexible Output**: Supports text, JSON, and XML output formats
- **Easy Integration**: Works well with CI/CD pipelines
- **Ranking System**: Provides letter grades (A-F) for complexity levels

### Weaknesses:

- **No Cognitive Complexity**: Doesn't measure how understandable the code is for humans
- **No Historical Tracking**: Can't track complexity changes over time
- **Learning Curve**: More complex to use than simpler tools

### Sample Usage:

```bash
# Basic complexity check
radon cc your_module.py

# With sorting and explanation
radon cc -s -e your_module.py

# Check maintainability index
radon mi your_module.py

# Raw metrics
radon raw your_module.py
```

### Sample Output:

```
your_module.py
    F 1:0 process_user_data - E (21)
    F 35:0 filter_data - B (8)
    F 50:0 validate_input - A (3)
```

Radon is ideal for teams that want comprehensive metrics and are willing to invest time in understanding the results.

---

## 2️⃣ McCabe: The Minimalist

The [McCabe](https://pypi.org/project/mccabe/) tool is laser-focused on one thing: cyclomatic complexity. It's simple, lightweight, and does its job well.

### Strengths:

- **Simplicity**: Does one thing and does it well
- **Performance**: Very fast due to its focused approach
- **Flake8 Integration**: Works seamlessly as a Flake8 plugin

### Weaknesses:

- **Limited Scope**: Only measures cyclomatic complexity
- **Basic Output**: Limited reporting capabilities
- **No Visualization**: Lacks visual representations of complexity

### Sample Usage:

```bash
# Direct usage (requires writing a script)
python -m mccabe --min 5 your_file.py

# As a Flake8 plugin
flake8 --max-complexity=10 your_file.py
```

McCabe is best for developers who already use Flake8 or just want quick, no-frills complexity checks.

---

## 3️⃣ Lizard: The Polyglot Powerhouse

[Lizard](https://github.com/terryyin/lizard) isn't just for Python—it supports over 15 programming languages and offers advanced metrics that other tools don't.

### Strengths:

- **Multi-Language Support**: Works with Python, C/C++, Java, JavaScript, and more
- **Cognitive Complexity**: One of the few tools that measures cognitive complexity
- **Function Arguments**: Counts function arguments, which can indicate design issues
- **Duplicate Code Detection**: Can identify code duplication
- **No Dependencies**: Standalone tool with no external requirements

### Weaknesses:

- **Less Python-Specific**: Not optimized solely for Python idioms
- **Documentation**: Less comprehensive documentation than others

### Sample Usage:

```bash
# Basic usage
lizard your_module.py

# Specify complexity threshold
lizard -C 10 your_module.py

# Include cognitive complexity
lizard -C 10 --CCN your_module.py

# Generate HTML report
lizard -o report.html your_module.py
```

### Sample Output:

```
================================================
  NLOC    CCN   token  PARAM  length  location  
------------------------------------------------
       6      2     29      1       6 validate_input@11-16@your_module.py
      12      4     51      2      12 filter_data@19-30@your_module.py
      24      8    120      3      24 process_user_data@33-56@your_module.py
```

Lizard excels in multi-language projects or when you need cognitive complexity metrics.

---

## 4️⃣ Wily: The Historian

[Wily](https://wily.readthedocs.io/) takes a unique approach by tracking complexity over time, showing how your codebase evolves.

### Strengths:

- **Historical Data**: Tracks complexity changes through git commits
- **Trend Analysis**: Shows whether complexity is increasing or decreasing
- **Multiple Metrics**: Supports cyclomatic complexity, maintainability index, etc.
- **Visualization**: Generates graphs of complexity trends
- **Top Offenders**: Identifies the most complex parts of your codebase

### Weaknesses:

- **Setup Required**: Needs an initial build step to index your code
- **Git Dependency**: Requires a git repository
- **Limited Real-Time Analysis**: Better for trend analysis than one-off checks

### Sample Usage:

```bash
# Build the cache (one-time setup)
wily build your_directory/

# View metrics for a file
wily report your_module.py

# Show complexity trends for a function
wily graph your_module.py:process_user_data -m cyclomatic

# Find the most complex functions
wily rank cyclomatic
```

### Sample Output:

```
your_module.py:process_user_data
---------------------------------
Metric: cyclomatic
Date       Author                    Value    
----------  ----------------------  ---------
2024-12-15  Jane Doe               21        
2025-01-10  John Smith             16        
2025-03-22  Jane Doe               8         
```

Wily is perfect for teams focused on long-term code quality and refactoring priorities.

---

## 5️⃣ Flake8 with Complexity Plugins: The Integrated Solution

[Flake8](https://flake8.pycqa.org/) itself isn't a complexity checker, but it easily integrates with complexity plugins like McCabe.

### Strengths:

- **All-in-One**: Combines style checking, linting, and complexity analysis
- **IDE Integration**: Works with most Python IDEs
- **CI/CD Ready**: Easily integrated into pipelines
- **Highly Configurable**: Extensive configuration options

### Weaknesses:

- **Limited Metrics**: Basic complexity analysis without the depth of specialized tools
- **Setup Required**: Needs plugin installation and configuration
- **No Visualization**: Text-only output

### Sample Usage:

```bash
# With McCabe plugin (comes with Flake8)
flake8 --max-complexity=10 your_module.py

# Configuration in setup.cfg
# [flake8]
# max-complexity = 10
```

### Sample Output:

```
./your_module.py:33:0: C901 'process_user_data' is too complex (21)
```

Flake8 with plugins is ideal when you want complexity checks integrated into your existing linting workflow.

---

## 🔍 Head-to-Head Comparison: Real-World Example

Let's analyze the same complex function with each tool and compare the results:

```python
def authenticate_user(username, password, mfa_token=None, auth_method='standard', retry=True, timeout=30):
    """Authenticate a user with various authentication methods."""
    attempts = 0
    max_attempts = 3 if retry else 1
    
    while attempts < max_attempts:
        try:
            if auth_method == 'standard':
                result = standard_auth(username, password, timeout=timeout)
            elif auth_method == 'oauth':
                result = oauth_auth(username, password, timeout=timeout)
            elif auth_method == 'ldap':
                result = ldap_auth(username, password, timeout=timeout)
            else:
                raise ValueError(f"Unknown auth method: {auth_method}")
                
            if result.success:
                if mfa_token is not None:
                    if verify_mfa(username, mfa_token):
                        log_success(username, auth_method)
                        return result
                    else:
                        log_failure(username, "MFA verification failed")
                        return AuthResult(success=False, reason="MFA_FAILED")
                else:
                    if requires_mfa(username, auth_method):
                        log_failure(username, "MFA required but not provided")
                        return AuthResult(success=False, reason="MFA_REQUIRED")
                    else:
                        log_success(username, auth_method)
                        return result
            else:
                attempts += 1
                if attempts < max_attempts:
                    time.sleep(2 ** attempts)  # Exponential backoff
                    continue
                else:
                    log_failure(username, f"Authentication failed after {attempts} attempts")
                    return result
                    
        except ConnectionError as e:
            if attempts < max_attempts - 1:
                attempts += 1
                time.sleep(2 ** attempts)
                continue
            else:
                log_error(f"Connection error during {auth_method} authentication: {str(e)}")
                return AuthResult(success=False, reason="CONNECTION_ERROR")
                
    return AuthResult(success=False, reason="MAX_ATTEMPTS_REACHED")
```

### Results:

| Tool | Complexity Score | Rating | Additional Info |
|------|-----------------|--------|----------------|
| Radon | 13 | D (high risk) | MI: 48.0 (medium maintainability) |
| McCabe | 13 | N/A | Above default threshold (10) |
| Lizard | 13 | N/A | NLOC: 38, tokens: 297, params: 6 |
| Wily | 13 | N/A | Increasing from previous version (was 10) |
| Flake8 | 13 | N/A | C901 Complexity too high |

All tools identify this function as overly complex, but each provides different supporting information:

- **Radon** gives a letter grade and maintainability index
- **Lizard** counts the number of lines and tokens
- **Wily** shows historical trends (in this case, complexity is increasing)
- **Flake8** integrates with other linting checks

---

## 🔄 Integration with Developer Workflow

Each tool can be integrated into your development workflow in different ways:

### Pre-commit Hooks

```yaml
# .pre-commit-config.yaml

# For Radon
- repo: https://github.com/akaihola/darker
  rev: 1.5.0
  hooks:
  - id: darker
    args: ["--radon"]
    
# For Flake8 with McCabe
- repo: https://github.com/pycqa/flake8
  rev: 6.1.0
  hooks:
  - id: flake8
    args: ["--max-complexity=10"]
    
# For Lizard
- repo: https://github.com/terryyin/lizard
  rev: 1.17.10
  hooks:
  - id: lizard
    args: ["-C10"]
```

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/code_quality.yml
name: Code Quality

on: [push, pull_request]

jobs:
  complexity-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install radon lizard wily flake8
      - name: Build wily cache
        run: wily build .
      - name: Check complexity
        run: |
          radon cc --min C .
          lizard -C 10
          wily rank cyclomatic -n 10
          flake8 --max-complexity=10 .
```

### IDE Integration

- **VS Code**: Extensions available for Flake8, Lizard
- **PyCharm**: Built-in support for Flake8, plugins for others
- **Vim/Neovim**: Integration via ALE or custom plugins
- **Sublime Text**: Linter plugins with Flake8 support

---

## 🤔 Which Tool Should You Choose?

The best tool depends on your specific needs:

### Choose **Radon** if:
- You need comprehensive metrics beyond just complexity
- You want detailed analysis with letter grading
- You need flexible output formats for reporting

### Choose **McCabe** if:
- You just need basic cyclomatic complexity
- You want something minimal and fast
- You're already using Flake8

### Choose **Lizard** if:
- You work in a multi-language environment
- You need cognitive complexity metrics
- You want to detect duplicated code
- You need to analyze function parameter counts

### Choose **Wily** if:
- You want to track complexity changes over time
- You need to prioritize refactoring efforts
- You want to relate complexity to commit history
- You need visualization of complexity trends

### Choose **Flake8 with plugins** if:
- You already use Flake8 for linting
- You want an integrated code quality tool
- You need seamless IDE integration

### Use Multiple Tools if:
- You need comprehensive analysis
- Different team members prefer different metrics
- You're establishing a new quality baseline

---

## 🔧 Advanced Techniques: Beyond Basic Checks

For more advanced complexity management:

### 1. Custom Complexity Thresholds by Module Type

Adjust complexity thresholds based on the module's role:

```ini
# .flake8
[flake8]
# Default threshold
max-complexity=10

# Higher threshold for test files
per-file-ignores =
    test_*.py: C901
    *_test.py: C901
```

### 2. Complexity Budgets

Set complexity "budgets" for different parts of your codebase:

```python
# complexity_budget.py
from radon.cli import cc
import sys

# Define budgets
BUDGETS = {
    "core/": {"max_avg": 5, "max_single": 15},
    "utils/": {"max_avg": 3, "max_single": 10},
    "plugins/": {"max_avg": 8, "max_single": 20},
}

# Check budgets
for path, budget in BUDGETS.items():
    results = cc(path)
    avg_complexity = sum(r.complexity for r in results) / len(results) if results else 0
    max_complexity = max((r.complexity for r in results), default=0)
    
    if avg_complexity > budget["max_avg"] or max_complexity > budget["max_single"]:
        print(f"Budget exceeded for {path}: avg={avg_complexity}, max={max_complexity}")
        sys.exit(1)

print("All complexity budgets are within limits!")
```

### 3. Complexity Trending

Use Wily to track complexity trends and set alerts for significant increases:

```bash
# Add to CI pipeline
wily diff main feature/new-feature --metrics cyclomatic -o json > complexity_diff.json

# Then parse and check for large increases
python -c "
import json
with open('complexity_diff.json') as f:
    data = json.load(f)
    increases = [item for item in data if item['difference'] > 5]
    if increases:
        print('Warning: Large complexity increases detected!')
        for inc in increases:
            print(f'{inc[\"path\"]}:{inc[\"function\"]} increased by {inc[\"difference\"]}')
        exit(1)
"
```

---

## 📚 See Also

- [Measuring Function Complexity in Python: Tools and Techniques](./measuring-function-complexity-python.md)
- [How Much Docstring is Enough?](./how-much-docstring-is-enough.md)
- [Automated Source Code Documentation](./automated-source-code-documentation.md)
- [Common Docstring Format in Python](./common-docstring-format-in-python.md)

---

## 💡 Final Thoughts

Code complexity analysis isn't about achieving perfect scores—it's about maintaining a codebase that's comprehensible, testable, and maintainable. The right tool for you depends on your team's needs, existing workflow, and quality goals.

Remember:
- Start with simpler tools and graduate to more complex ones as needed
- Integrate complexity checking into your workflow as early as possible
- Use trend analysis to prevent complexity drift over time
- Don't chase metrics blindly—understand what they mean for your code

Most importantly, use these tools as guides, not gospel. A function might be justifiably complex due to its domain, and that's okay as long as it's well-documented, well-tested, and carefully reviewed.

> "Measuring programming progress by lines of code is like measuring aircraft building progress by weight." — Bill Gates

What matters most isn't the tool you choose, but your commitment to code quality and maintainability.