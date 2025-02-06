---
layout: doc
title: "AzureML vs HyperDrive"
description: "Azure Machine Learning provides two powerful features for model training and optimization"
keywords: Penify-CLI, code documentation, automation, AI-powered documentation, developer tools, command-line interface, Git integration, software development, code maintainability, documentation best practices, time-saving tools, continuous integration
author: Suman Sauarbh
linkedInUrl: https://www.linkedin.com/in/ssumansaurabh/
image: https://media.licdn.com/dms/image/v2/D5603AQEDru6Q4UkzEg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1681498321113?e=1730332800&v=beta&t=PM0PsCMZs4Ar0TIweuSdqU-P7kuWLm9gmEZ_spGFDsw
---

Azure Machine Learning provides two powerful features for model training and optimization: **HyperDrive** and **Automated Machine Learning (AutoML)**. While both aim to enhance model performance, they serve different purposes and target different levels of expertise. Here’s a breakdown of the key differences:

### 🔹 **Azure Machine Learning HyperDrive**
**Purpose:**  
HyperDrive is a **hyperparameter tuning tool** that helps you systematically optimize machine learning models by running multiple training jobs with different hyperparameter combinations.

**Key Features:**
- Focuses on hyperparameter optimization for manually created models.
- Supports different search strategies:
  - **Grid Search** – Tests all possible combinations (brute force).
  - **Random Search** – Randomly selects hyperparameter values.
  - **Bayesian Optimization** – Uses past results to intelligently select the next hyperparameters.
  - **Bandit-based early termination** – Stops poorly performing runs early to save resources.
- Requires a predefined model and training script.
- Best suited for experienced data scientists who want fine control over model tuning.

---

### 🔹 **Azure Machine Learning AutoML**
**Purpose:**  
AutoML is an **end-to-end model automation tool** that automates the process of selecting the best model and hyperparameters with minimal manual effort.

**Key Features:**
- Automates the entire ML pipeline: feature engineering, algorithm selection, hyperparameter tuning, and model evaluation.
- Supports multiple ML tasks like **classification, regression, and time series forecasting**.
- Uses multiple machine learning algorithms and selects the best one.
- Requires minimal coding, making it beginner-friendly.
- Best suited for users who want fast, automated model training without deep ML expertise.

---

### 🚀 **Key Differences:**
| Feature          | HyperDrive  | AutoML  |
|-----------------|------------|---------|
| **Purpose**     | Optimizes hyperparameters for a given model | Automates model selection, feature engineering, and hyperparameter tuning |
| **User Control** | High (requires manual setup) | Low (automated process) |
| **Algorithms**  | Works with manually defined models | Selects from multiple ML algorithms |
| **Search Methods** | Grid, random, Bayesian | Automated search & optimization |
| **Best for**    | Experienced ML practitioners | Beginners or those looking for automation |

### **When to Use What?**
- **Use HyperDrive** if you already have a machine learning model and want to optimize its performance by fine-tuning hyperparameters.
- **Use AutoML** if you want an automated, hands-off approach to model training, including algorithm selection and hyperparameter tuning.

Would you like an example of how to set up either in Azure ML? 🚀

### 🚀 **Setting Up Azure Machine Learning HyperDrive and AutoML**
I'll provide step-by-step examples for both **HyperDrive** and **AutoML** using the **Azure Machine Learning SDK (Python)**.

---

## 🔹 **1. Setting Up HyperDrive for Hyperparameter Tuning**
### **Step 1: Install and Import Required Libraries**
```python
!pip install azureml-sdk azureml-train-hyperdrive
```
```python
from azureml.core import Workspace, Experiment, ScriptRunConfig
from azureml.train.hyperdrive import (
    HyperDriveConfig, RandomParameterSampling, 
    BanditPolicy, PrimaryMetricGoal, choice, uniform
)
```

### **Step 2: Connect to Azure ML Workspace**
```python
ws = Workspace.from_config()
experiment = Experiment(workspace=ws, name="hyperdrive-experiment")
```

### **Step 3: Define the Training Script**
Create a `train.py` script that includes hyperparameters as arguments:
```python
import argparse
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

parser = argparse.ArgumentParser()
parser.add_argument('--n_estimators', type=int, default=100)
parser.add_argument('--max_depth', type=int, default=5)
args = parser.parse_args()

# Load Data
data = load_iris()
X_train, X_test, y_train, y_test = train_test_split(data.data, data.target, test_size=0.2)

# Train Model
model = RandomForestClassifier(n_estimators=args.n_estimators, max_depth=args.max_depth)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"Accuracy: {acc}")
```

### **Step 4: Configure Hyperparameter Search Space**
```python
param_sampling = RandomParameterSampling({
    '--n_estimators': choice(50, 100, 150, 200),
    '--max_depth': uniform(2, 10)
})
```

### **Step 5: Define Early Stopping Policy**
```python
early_termination_policy = BanditPolicy(slack_factor=0.2, evaluation_interval=2)
```

### **Step 6: Configure and Submit HyperDrive Experiment**
```python
script_config = ScriptRunConfig(
    source_directory='.',
    script='train.py',
    compute_target='cpu-cluster'
)

hyperdrive_config = HyperDriveConfig(
    run_config=script_config,
    hyperparameter_sampling=param_sampling,
    policy=early_termination_policy,
    primary_metric_name='Accuracy',
    primary_metric_goal=PrimaryMetricGoal.MAXIMIZE,
    max_total_runs=10,
    max_concurrent_runs=4
)

hyperdrive_run = experiment.submit(hyperdrive_config)
hyperdrive_run.wait_for_completion(show_output=True)
```

### **Step 7: Retrieve the Best Model**
```python
best_run = hyperdrive_run.get_best_run_by_primary_metric()
best_run_metrics = best_run.get_metrics()
print(f"Best Run ID: {best_run.id}")
print(f"Best Model Accuracy: {best_run_metrics['Accuracy']}")
```

---

## 🔹 **2. Setting Up Automated Machine Learning (AutoML)**
### **Step 1: Install AutoML SDK**
```python
!pip install azureml-sdk azureml-train-automl
```
```python
from azureml.core import Workspace, Dataset, Experiment
from azureml.train.automl import AutoMLConfig
```

### **Step 2: Load the Dataset**
```python
ws = Workspace.from_config()
dataset = Dataset.Tabular.from_delimited_files(path="https://raw.githubusercontent.com/jbrownlee/Datasets/master/pima-indians-diabetes.data.csv")
```

### **Step 3: Configure AutoML Settings**
```python
automl_config = AutoMLConfig(
    task="classification",
    training_data=dataset,
    label_column_name="Outcome",
    primary_metric="accuracy",
    iterations=20,
    compute_target="cpu-cluster"
)
```

### **Step 4: Submit AutoML Experiment**
```python
experiment = Experiment(ws, "automl-experiment")
automl_run = experiment.submit(automl_config)
automl_run.wait_for_completion(show_output=True)
```

### **Step 5: Retrieve the Best Model**
```python
best_run, fitted_model = automl_run.get_output()
print(best_run)
```

---

## 🔹 **Summary**
| Feature          | HyperDrive  | AutoML  |
|-----------------|------------|---------|
| **Purpose**     | Hyperparameter tuning for a given model | End-to-end model automation |
| **User Input**  | Requires a pre-defined ML model | Finds the best ML model automatically |
| **Search Method** | Grid, Random, Bayesian | Automated search |
| **Best for**    | ML experts needing fine control | Beginners or those looking for automation |

Would you like a **hands-on tutorial** or a **notebook file** for these implementations? 🚀


### **🚀 Models and Search Methods in Azure ML HyperDrive & AutoML**
Azure Machine Learning supports a variety of **machine learning models** across different tasks and provides **hyperparameter search strategies** to optimize them. Let's dive into these in more detail.

---

## 🔹 **1. Models Supported in Azure Machine Learning**
The models you can use depend on whether you're using **HyperDrive (custom models)** or **AutoML (pre-configured models).**

### **1.1 Models in Azure ML HyperDrive**
Since **HyperDrive** is a hyperparameter tuning framework, you can apply it to any model you define. This includes:

#### **🌟 Classical Machine Learning Models**
- **Regression Models**
  - Linear Regression
  - Ridge Regression
  - Lasso Regression
  - Decision Tree Regression
  - Random Forest Regression
  - XGBoost Regression
  - LightGBM Regression
  - Support Vector Regression (SVR)
  
- **Classification Models**
  - Logistic Regression
  - Decision Trees
  - Random Forest
  - Gradient Boosting (XGBoost, LightGBM, CatBoost)
  - Support Vector Machines (SVM)
  - k-Nearest Neighbors (KNN)
  - Naive Bayes
  
- **Clustering Models**
  - k-Means
  - DBSCAN
  - Hierarchical Clustering
  
- **Deep Learning Models**
  - TensorFlow/Keras models (CNNs, LSTMs, Transformers)
  - PyTorch models (Custom deep learning models)

---

### **1.2 Models in Azure ML AutoML**
Azure AutoML automatically selects the best model for your dataset. It supports:

#### **🌟 Classification**
- Logistic Regression
- Random Forest
- Gradient Boosting (XGBoost, LightGBM, CatBoost)
- SVM (Support Vector Machines)
- Neural Networks (MLP)
- Naive Bayes
- k-Nearest Neighbors (KNN)
- Decision Trees

#### **🌟 Regression**
- Linear Regression
- Ridge/Lasso Regression
- Decision Trees
- Random Forest
- XGBoost, LightGBM
- Neural Networks
- Bayesian Ridge Regression

#### **🌟 Time Series Forecasting**
- ARIMA (AutoRegressive Integrated Moving Average)
- Prophet (by Facebook)
- Exponential Smoothing (ETS)
- Gradient Boosting (XGBoost, LightGBM)
- LSTM-based models

> AutoML automatically tries multiple models and **selects the best one based on the evaluation metric.** 🚀

---

## 🔹 **2. Hyperparameter Search Methods in Azure ML HyperDrive**
HyperDrive provides different strategies for **hyperparameter tuning**:

### **1️⃣ Grid Search (Exhaustive Search)**
- Tests **all possible combinations** of hyperparameters.
- **Best for small search spaces** (limited number of hyperparameters).
- **Downside:** Can be slow and resource-intensive.

#### **Example:**
```python
from azureml.train.hyperdrive import choice

param_sampling = GridParameterSampling({
    '--n_estimators': choice(50, 100, 150, 200),
    '--max_depth': choice(3, 5, 7, 9)
})
```
💡 **Use case:** When you have a **small** set of possible hyperparameter values.

---

### **2️⃣ Random Search**
- Randomly selects values for hyperparameters from a defined range.
- **Faster than grid search** because it does not check all combinations.
- **Best for large search spaces** with continuous values.

#### **Example:**
```python
from azureml.train.hyperdrive import RandomParameterSampling, uniform

param_sampling = RandomParameterSampling({
    '--learning_rate': uniform(0.01, 0.1),
    '--n_estimators': choice(50, 100, 200)
})
```
💡 **Use case:** When the search space is **large**, and you want a **quick, approximate** best hyperparameter combination.

---

### **3️⃣ Bayesian Optimization**
- Uses past trials to intelligently select the next set of hyperparameters.
- **More efficient than random search** because it focuses on promising areas.
- **Best for expensive model training** (e.g., deep learning).

#### **Example:**
```python
from azureml.train.hyperdrive.sampling import BayesianParameterSampling

param_sampling = BayesianParameterSampling({
    '--learning_rate': uniform(0.001, 0.1),
    '--batch_size': choice(16, 32, 64)
})
```
💡 **Use case:** When training is **slow and expensive** (deep learning models, large datasets).

---

### **4️⃣ Bandit Policy (Early Stopping)**
- Stops poorly performing runs early.
- **Useful for saving resources** when training multiple models.
- Compares new runs to the **best performing run so far**.

#### **Example:**
```python
from azureml.train.hyperdrive import BanditPolicy

early_stopping_policy = BanditPolicy(slack_factor=0.2, evaluation_interval=2)
```
💡 **Use case:** When training a **large number of models** and you want to **stop bad models early** to save time and compute power.

---

## 🔹 **3. Hyperparameter Tuning with AutoML**
Unlike HyperDrive, **AutoML automatically selects and tunes hyperparameters** using:
- Bayesian Optimization
- Evolutionary Algorithms
- Bandit Strategies

You **do not need to define hyperparameters manually** in AutoML. Instead, it will:
1. Try different **models**.
2. Tune the best ones using **automated search**.
3. Return the **best-performing model and hyperparameters**.

### **AutoML Example:**
```python
automl_config = AutoMLConfig(
    task="classification",
    training_data=dataset,
    label_column_name="Outcome",
    primary_metric="accuracy",
    iterations=30,
    compute_target="cpu-cluster"
)
```
💡 **Use case:** When you want a **fully automated** process for selecting models and hyperparameters.

---

## 🔹 **4. Comparison: HyperDrive vs AutoML**
| Feature          | HyperDrive  | AutoML  |
|-----------------|------------|---------|
| **Purpose**     | Tune hyperparameters of a given model | Automate model selection and hyperparameter tuning |
| **User Control** | High – users define search space | Low – AutoML selects best settings |
| **Models Used** | Any model (custom models) | Prebuilt ML models |
| **Search Methods** | Grid, Random, Bayesian, Bandit | Bayesian, Evolutionary, Bandit |
| **Best for**    | Experts tuning specific models | Beginners or those wanting automation |

---

## **🚀 Which One Should You Use?**
✅ **Use HyperDrive** if:
- You have a **specific model** and want to fine-tune it.
- You need **custom ML models** (e.g., deep learning, reinforcement learning).
- You want **full control** over hyperparameter tuning.

✅ **Use AutoML** if:
- You **don’t know** which model is best for your data.
- You want a **hands-off, automated approach**.
- You need to **quickly get an optimized model** without manual tuning.

---