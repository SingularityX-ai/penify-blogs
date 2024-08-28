---
layout: doc
title: "Four Common Docstring format in Python according to PEP-8 Style Guide"
description: "Standard Python Docstring according to PEP-8 style guide and they are Google, Epytext, rEST, Numpy"
image: "../../public/blogs/docstring.webp"
publishedAt: "2024-02-12"
updatedAt: "2024-02-12"
author: "Suman Saurabh"
isPublished: true
keywords: Python docstrings, PEP-8 style guide, PEP-257, Google docstring format, Epytext format, reStructuredText (rST), NumPy docstring format, code documentation, Python best practices, PEP-8
---

# Four Common Docstring format in Python according to PEP-8 Style Guide

Python, renowned for its readability and straightforward syntax, places a significant emphasis on documentation. The Python Enhancement Proposal (PEP) 8 style guide, which outlines the conventions for writing readable code, also hints at the importance of using docstrings to document code effectively. Alongside PEP-8, PEP-257 delves deeper into docstring conventions, ensuring developers know how to document their code comprehensively. This article will explore four common docstring formats that align with the PEP-8 style guide: Google, Epytext, reStructuredText (rST), and NumPy.

### Google Docstring Format

The Google style is favored for its readability and simplicity, making it an excellent choice for beginners and seasoned developers alike. It uses a straightforward approach, with sections clearly marked to describe parameters, return types, and raised exceptions.

```python
def function_name(param1, param2):
    """Summary of the function.

    Args:
        param1 (type): Description of param1.
        param2 (type): Description of param2.

    Returns:
        type: Description of return value.

    Raises:
        ExceptionType: Description of exception.
    """
```

### Epytext Format
Epytext, used primarily with the Epydoc documentation tool, is similar to Javadoc. It uses a more structured format with tags enclosed in `@` symbols to denote different sections of the documentation, such as parameters, return values, and exceptions.

```python
def function_name(param1, param2):
    """
    Summary of the function.

    @param param1: Description of param1.
    @type param1: type
    @param param2: Description of param2.
    @type param2: type
    @return: Description of return value.
    @rtype: type
    @raise ExceptionType: Description of exception.
    """
```

### reStructuredText (rST) Format

reStructuredText is a powerful and versatile markup language that's used extensively in Python documentation, particularly in Sphinx documentation. Its docstring format allows for rich documentation, including links, formatted text, and much more.

```python
def function_name(param1, param2):
    """
    Summary of the function.

    :param param1: Description of param1.
    :type param1: type
    :param param2: Description of param2.
    :type param2: type
    :returns: Description of return value.
    :rtype: type
    :raises ExceptionType: Description of exception.
    """
```

### NumPy Docstring Format

The NumPy docstring format is an extension of the Google style, offering detailed sections for describing functions, including examples. It's particularly well-suited for scientific computing and data analysis libraries.

```python
def function_name(param1, param2):
    """
    Summary of the function.

    Parameters
    ----------
    param1 : type
        Description of param1.
    param2 : type
        Description of param2.

    Returns
    -------
    type
        Description of return value.

    Raises
    ------
    ExceptionType
        Description of exception.

    Examples
    --------
    >>> function_name(value1, value2)
    """
```

Each of these formats has its strengths and caters to different preferences and requirements. Whether you prioritize readability, detail, or compatibility with documentation tools, adopting one of these docstring formats can enhance your code's maintainability and ease of use.

Documentation is a crucial aspect of software development, offering insights into the purpose and usage of code blocks. By adhering to the PEP-8 style guide and incorporating comprehensive docstrings, developers can create more accessible, maintainable, and user-friendly Python code.

---

This blog post is designed to offer an overview of the importance of docstrings in Python and how different formats can be applied to align with the PEP-8 style guide. Whether you're documenting a small script or a large codebase, choosing the right docstring format can significantly impact the readability and utility of your documentation.

#Snorkell #docstring #Epytext Docstring #reStructuredText #rEST #Google Docstring Format #NumPy Docstring Example #docstrings #Docstring format #pep-8 #pep-257 #Python Docstrings #PEP-8 Style Guide #Code Documentation #Python Programming #Software Documentation #Sphinx Documentation Python #Python Code Examples #Docstring Conventions #Python Best Practices #Python Development #API Documentation in Python
