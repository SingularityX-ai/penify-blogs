---
layout: doc
title: "Chain of Draft: Thinking Faster with Less"
description: "Discover how Chain of Draft (CoD) enhances LLM reasoning efficiency by reducing token usage and latency, inspired by human cognitive shortcuts, and its implications for real-time AI applications."
keywords: Chain of Draft, CoD, Chain of Thought, CoT, large language models, LLM reasoning, efficient prompting, token reduction, latency optimization, AI reasoning strategies, human-inspired AI, arithmetic reasoning, commonsense reasoning, symbolic reasoning, GPT-4o, Claude 3.5 Sonnet, real-time AI applications, cost-effective AI, concise reasoning, Zoom Communications, AI efficiency, machine learning prompting, practical AI deployment
author: Suman Sauarbh
linkedInUrl: https://www.linkedin.com/in/ssumansaurabh/
image: https://media.licdn.com/dms/image/v2/D5603AQEDru6Q4UkzEg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1681498321113?e=1730332800&v=beta&t=PM0PsCMZs4Ar0TIweuSdqU-P7kuWLm9gmEZ_spGFDsw
---

# Chain of Draft: Thinking Faster with Less

### Key Points
- Research suggests Chain of Draft (CoD) can make large language models (LLMs) reason faster by using fewer tokens, inspired by human note-taking.
- It seems likely that CoD maintains accuracy similar to Chain of Thought (CoT) while reducing latency and cost, based on recent studies.
- The evidence leans toward CoD being effective for structured tasks like math and common sense reasoning, with up to 80% fewer tokens used.

### What is Chain of Draft (CoD)?
Chain of Draft (CoD) is a new way to prompt LLMs to think through problems more efficiently. Instead of detailing every step like in Chain of Thought (CoT), CoD encourages the model to jot down only the essential information, much like how humans take quick notes. For example, for a math problem, CoT might explain every step in full sentences, while CoD might just write a concise equation like "20 - x = 12; x = 8."

### How Does It Work?
CoD works by instructing the model to think step by step but keep each reasoning step very short, ideally within five words. This is done through specific prompts and examples that show the model how to be concise, without needing to change its underlying training.

### Benefits and Findings
Recent experiments show CoD can achieve similar accuracy to CoT but uses significantly fewer tokens, reducing computational cost and response time. For instance, in math tasks, CoD used about 40 tokens compared to CoT's 200, with only a small accuracy drop from 95% to 91%.

---

### Detailed Analysis: Chain of Draft and Its Implications for LLMs

#### Introduction
Large Language Models (LLMs) have transformed how we interact with AI, particularly in reasoning tasks. A popular method, Chain of Thought (CoT), prompts LLMs to reason step by step, mimicking human problem-solving. However, CoT's verbosity can lead to high token usage, increasing latency and cost, which is a challenge for real-time applications. To address this, researchers from Zoom Communications introduced Chain of Draft (CoD), a novel prompting strategy inspired by human cognitive processes. This report explores CoD's mechanics, experimental results, and potential implications, providing a comprehensive overview for both technical and non-technical audiences.

#### Background: Chain of Thought and Its Limitations
Chain of Thought (CoT), first popularized by Wei et al. (2022), enhances LLM reasoning by breaking problems into detailed, step-by-step explanations. For example, solving "Jason had 20 lollipops, gave some to Dennys, and now has 12; how many did he give?" might result in a CoT response like:

- "1. Initially, Jason had 20 lollipops.
- 2. After giving some to Dennys, Jason now has 12 lollipops.
- 3. To find out how many lollipops Jason gave to Dennys, we need to calculate the difference between the initial number and the remaining number.
- 4. So, the number given to Dennys is 20 - 12.
- 5. That equals 8."

While effective, this approach can generate around 200 tokens per response, leading to increased latency (e.g., 4.2 seconds for GPT-4o) and computational cost, making it less suitable for cost-sensitive or real-time scenarios.

#### Chain of Draft: A Concise Alternative
Chain of Draft (CoD) addresses these inefficiencies by prompting LLMs to generate minimalistic yet informative intermediate reasoning outputs. Inspired by how humans externalize thought—jotting down key insights rather than elaborating—CoD reduces verbosity. For the same lollipop problem, a CoD response might be:

- "20 - x = 12; x = 20 - 12 = 8. #### 8"

This approach focuses on essential calculations or transformations, significantly cutting down token usage. The paper, published on arXiv ([Chain of Draft: Thinking Faster by Writing Less](https://arxiv.org/abs/2502.18600)), suggests CoD uses as little as 7.6% of the tokens CoT requires, with experiments showing reductions up to 80%.

#### Implementation: Prompting for Efficiency
CoD is implemented through specific prompting strategies. The system prompt for CoD is: "Think step by step, but only keep a minimum draft for each thinking step, with 5 words at most. Return the answer at the end of the response after a separator ####." This guidance, combined with few-shot examples manually crafted by the authors, helps the model adopt concise reasoning without additional training. For instance, few-shot examples demonstrate how to distill reasoning into short, abstract representations, such as equations for math problems.

This method contrasts with other latency-reducing approaches like Skeleton-of-Thought (SoT), which generates an outline first, or streaming, which provides partial outputs incrementally. CoD's per-step budget allows unlimited reasoning steps, making it adaptable to various structured reasoning techniques, unlike global token budget methods like Concise Thoughts (CCoT) or token-budget-aware LLM reasoning (TALE), which may struggle with complex tasks.

#### Experimental Evaluation
The paper evaluated CoD across three categories of tasks: arithmetic reasoning, common sense reasoning, and symbolic reasoning, using two flagship models, GPT-4o (OpenAI, 2024) and Claude 3.5 Sonnet (Anthropic, 2024). Below are the detailed results, presented in tables for clarity.

##### Arithmetic Reasoning: GSM8k
GSM8k, a benchmark with 8,500 grade-school math problems, tests arithmetic, geometry, algebra, and logical reasoning. Results are shown in Table 1.

| Model            | Prompt   | Accuracy | Token # | Latency |
|------------------|----------|----------|---------|---------|
| GPT-4o           | Standard | 53.3%    | 1.1     | 0.6 s   |
| GPT-4o           | CoT      | 95.4%    | 205.1   | 4.2 s   |
| GPT-4o           | CoD      | 91.1%    | 43.9    | 1.0 s   |
| Claude 3.5 Sonnet| Standard | 64.6%    | 1.1     | 0.9 s   |
| Claude 3.5 Sonnet| CoT      | 95.8%    | 190.0   | 3.1 s   |
| Claude 3.5 Sonnet| CoD      | 91.4%    | 39.8    | 1.6 s   |

CoD achieved 91% accuracy with about 40 tokens, reducing token usage by 80% and latency by 76.2% for GPT-4o and 48.4% for Claude 3.5 Sonnet compared to CoT.

##### Commonsense Reasoning: Date and Sports Understanding
Tasks from BIG-bench ([Beyond the Imitation Game: Quantifying and Extrapolating the Capabilities of Language Models](https://arxiv.org/abs/2304.06718)) evaluated common sense reasoning. Results for date understanding are in Table 2, and sports understanding in Table 3.

| Model            | Prompt   | Accuracy | Token # | Latency |
|------------------|----------|----------|---------|---------|
| GPT-4o           | Standard | 72.6%    | 5.2     | 0.6 s   |
| GPT-4o           | CoT      | 90.2%    | 75.7    | 1.7 s   |
| GPT-4o           | CoD      | 88.1%    | 30.2    | 1.3 s   |
| Claude 3.5 Sonnet| Standard | 84.3%    | 5.2     | 1.0 s   |
| Claude 3.5 Sonnet| CoT      | 87.0%    | 172.5   | 3.2 s   |
| Claude 3.5 Sonnet| CoD      | 89.7%    | 31.3    | 1.4 s   |

For sports understanding:

| Model            | Prompt   | Accuracy | Token # | Latency |
|------------------|----------|---------|---------|---------|
| GPT-4o           | Standard | 90.0%   | 1.0     | 0.4 s   |
| GPT-4o           | CoT      | 95.9%   | 28.7    | 0.9 s   |
| GPT-4o           | CoD      | 98.3%   | 15.0    | 0.7 s   |
| Claude 3.5 Sonnet| Standard | 90.6%   | 1.0     | 0.9 s   |
| Claude 3.5 Sonnet| CoT      | 93.2%   | 189.4   | 3.6 s   |
| Claude 3.5 Sonnet| CoD      | 97.3%   | 14.3    | 1.0 s   |

CoD reduced tokens by 92.4% for sports understanding in Claude 3.5 Sonnet, with improved accuracy in some cases.

##### Symbolic Reasoning: Coin Flip Tasks
A synthesized test set of 250 coin flip examples, following Wei et al. (2022), tested symbolic reasoning. An example is: "A coin is heads up. Robyn flips the coin. Peggy flips the coin. Grant flips the coin. Vanessa does not flip the coin. Is the coin still heads up? A: No." Results are in Table 4.

| Model            | Prompt   | Accuracy | Token # | Latency |
|------------------|----------|----------|---------|---------|
| GPT-4o           | Standard | 73.2%    | 1.0     | 0.4 s   |
| GPT-4o           | CoT      | 100.0%   | 52.4    | 1.4 s   |
| GPT-4o           | CoD      | 100.0%   | 16.8    | 0.8 s   |
| Claude 3.5 Sonnet| Standard | 85.2%    | 1.0     | 1.2 s   |
| Claude 3.5 Sonnet| CoT      | 100.0%   | 135.3   | 3.1 s   |
| Claude 3.5 Sonnet| CoD      | 100.0%   | 18.9    | 1.6 s   |

Both CoT and CoD achieved 100% accuracy, but CoD reduced tokens by 68% for GPT-4o and 86% for Claude 3.5 Sonnet.

#### Discussion: Efficiency vs. Accuracy
CoD's primary advantage is its efficiency, reducing latency and cost without significant accuracy loss. For instance, in GSM8k, the accuracy drop from 95% (CoT) to 91% (CoD) is minimal compared to the 80% token reduction. This trade-off is particularly beneficial for real-time applications, such as customer service chatbots or decision-support systems, where speed is critical.

An unexpected detail is that CoD sometimes outperforms CoT in accuracy, as seen in sports understanding for Claude 3.5 Sonnet (89.7% vs. 87.0%). This suggests that concise reasoning might reduce overthinking, a known issue with CoT where models generate unnecessary details, potentially leading to errors.

#### Limitations and Future Directions
While CoD shows promise, it may face challenges with very complex tasks where detailed reasoning is crucial. The paper notes that for tasks requiring reflection, self-correction, or external knowledge, CoD's conciseness might miss important details. Additionally, the reliance on manually crafted few-shot examples could be time-consuming, though the efficiency gains may justify this effort.

Future research could explore combining CoD with other latency-reducing methods, such as adaptive parallel reasoning or multi-pass validation, to further optimize performance. Training LLMs with compact reasoning data could also enhance CoD's effectiveness, maintaining interpretability and efficiency.

#### Conclusion
Chain of Draft (CoD) offers a compelling approach to enhance LLM reasoning efficiency, reducing token usage and latency while maintaining high accuracy for structured tasks. Its inspiration from human cognitive processes highlights the potential for aligning AI reasoning with natural, efficient thought patterns. As of March 1, 2025, this method is gaining attention for its practical implications in cost-sensitive and real-time applications, with ongoing research likely to expand its applicability.

#### Key Citations
- [Chain of Draft: Thinking Faster by Writing Less](https://arxiv.org/abs/2502.18600)
- [Beyond the Imitation Game: Quantifying and Extrapolating the Capabilities of Language Models](https://arxiv.org/abs/2304.06718)
- [Training Verifiers to Solve Math Word Problems](https://arxiv.org/abs/2110.14168)
- [Name Dataset for Coin Flip Tasks](https://github.com/philipperemy/name-dataset)