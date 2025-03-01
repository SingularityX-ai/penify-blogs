---
layout: doc
title: "Run HyperDrive Using Azure"
keywords: Azure Machine Learning, HyperDrive, AutoML, Hyperparameter Tuning, Machine Learning Optimization, Automated Machine Learning, AI Model Training, Data Science Automation, ML Model Selection, Cloud AI Tools, Deep Learning Optimization, AI in Azure, ML Workflow Automation, AI for Developers, Model Training in Azure
author: Suman Saurabh
linkedInUrl: https://www.linkedin.com/in/ssumansaurabh/
image: https://media.licdn.com/dms/image/v2/D5603AQEDru6Q4UkzEg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1681498321113?e=1730332800&v=beta&t=PM0PsCMZs4Ar0TIweuSdqU-P7kuWLm9gmEZ_spGFDsw
---

# Run HyperDrive Using Azure

Azure Machine Learning's HyperDrive is a powerful tool for hyperparameter tuning. It allows you to efficiently search for the best hyperparameters for your machine learning models.

## What is HyperDrive?

HyperDrive is a feature of Azure Machine Learning that automates the process of hyperparameter tuning. It uses various search algorithms to find the optimal set of hyperparameters for your model.

## Steps to Run HyperDrive on Azure

### Step 1: Set Up Your Azure Environment

First, you need to set up your Azure environment. This includes creating an Azure Machine Learning workspace and configuring your compute resources.

```python
from azureml.core import Workspace

ws = Workspace.from_config()
```

### Step 2: Define Your Hyperparameter Search Space

Next, define the hyperparameters you want to tune and their respective search spaces.

```python
from azureml.train.hyperdrive import RandomParameterSampling, choice

param_sampling = RandomParameterSampling({
    "learning_rate": choice(0.01, 0.1, 1.0),
    "batch_size": choice(16, 32, 64)
})
```

### Step 3: Configure Your HyperDrive Run

Configure your HyperDrive run by specifying the estimator, hyperparameter sampling, and other settings.

```python
from azureml.train.hyperdrive import HyperDriveConfig, PrimaryMetricGoal

hyperdrive_config = HyperDriveConfig(
    estimator=estimator,
    hyperparameter_sampling=param_sampling,
    primary_metric_name="accuracy",
    primary_metric_goal=PrimaryMetricGoal.MAXIMIZE,
    max_total_runs=20,
    max_concurrent_runs=4
)
```

### Step 4: Submit Your HyperDrive Run

Submit your HyperDrive run to start the hyperparameter tuning process.

```python
from azureml.core.experiment import Experiment

experiment = Experiment(ws, "hyperdrive_experiment")
hyperdrive_run = experiment.submit(hyperdrive_config)
```

### Step 5: Monitor Your HyperDrive Run

Monitor the progress of your HyperDrive run and view the results.

```python
hyperdrive_run.wait_for_completion(show_output=True)
best_run = hyperdrive_run.get_best_run_by_primary_metric()
print(best_run.get_metrics())
```

## Conclusion

Running HyperDrive on Azure is a straightforward process that can significantly improve the performance of your machine learning models. By automating hyperparameter tuning, you can save time and resources while achieving better results.
