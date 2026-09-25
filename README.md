**Teaching and Evaluating LLMs to Reason About Polymer Design Related Tasks**

Dikshya Mohanty, Mohammad Saqib Hasan, Syed Mostofa Monsur, Size Zheng, Benjamin Hsiao,
Niranjan Balasubramanian — Stony Brook University

*Under Review*, Accepted at **LM4Sci @ COLM 2026**.

🌐 [Project page](https://stonybrooknlp.github.io/PolyBench/)

---

## About

PolyBench is a large-scale training and test benchmark of more than **125K polymer
design-related tasks**, built on a knowledge base of over **13 million** experimental and
synthetic polymer data points. Tasks span six categories — from structural understanding
through synthesis and design — and are augmented with knowledge-grounded chain-of-thought
traces produced by a distillation pipeline in which teacher models are conditioned on
complete polymer profiles and gold answers.

Models with 7B–32B parameters fine-tuned on PolyBench outperform similar-sized off-the-shelf
and chemistry-aligned baselines, remain competitive with closed-source frontier LLMs on the
PolyBench test set, and transfer to four external polymer benchmarks.

| | Train | Dev | Test |
| --- | ---: | ---: | ---: |
| Questions | 125.3K | 1.83K | 2.31K |

## Project page

The website lives in [`docs/`](docs/) and is served by GitHub Pages from the `main` branch,
`/docs` folder (**Settings → Pages → Deploy from a branch**). See
[`docs/README.md`](docs/README.md) for how to preview it locally, add figures, and update
the results tables.

## Data, code, and models

Data and code will be released here under **CC BY-NC 4.0** for non-commercial research use.
Fine-tuned model weights will be released on Hugging Face under their respective base model
licenses (MIT for Phi-4, Apache 2.0 for Qwen-2.5). Distilled CoT traces will be released
consistent with each teacher provider's terms of service.

## Citation

```bibtex
@misc{mohanty2026teachingevaluatingllmsreason,
      title={Teaching and Evaluating LLMs to Reason About Polymer Design Related Tasks}, 
      author={Dikshya Mohanty and Mohammad Saqib Hasan and Syed Mostofa Monsur and Size Zheng and Benjamin Hsiao and Niranjan Balasubramanian},
      year={2026},
      eprint={2601.16312},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/abs/2601.16312}, 
}
```

## Acknowledgments

This material is based on research that is in part supported by DARPA for the SciFy program
under agreement number HR00112520301. The U.S. Government is authorized to reproduce and
distribute reprints for Governmental purposes notwithstanding any copyright notation
thereon. This work was also supported by a seed grant from the AI Innovation Institute at
Stony Brook University.

## On potential risks

No generated structure in this work has been experimentally synthesized or characterized.
Outputs should be treated as candidate hypotheses for expert review rather than design
recommendations, and should not be used to direct laboratory work without independent
verification.
