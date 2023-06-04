# FlavorGraph instructions (work-in-progress)

## CLI setup:

In order to set up a VM, e.g., on AWS, where a Linux-based shell CLI is available, do the following to set up the basic FlavorGraph environment and begin training. 

### Setup virtual environment

```
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
sh Miniconda3-latest-Linux-x86_64.sh # manually read through TOS and enter 'yes'.
source ~/.bashrc
conda update -n base -c defaults conda -y
conda create -n FG_env python=3.10 conda pytorch numpy pandas seaborn scikit-learn networkx
conda activate FG_env
pip install --upgrade pip
conda install -c conda-forge gdown
conda install -c conda-forge texttable
pip install chart_studio
```

### Setup repo

```
git clone https://github.com/lamypark/FlavorGraph.git 
cd FlavorGraph
mkdir input/paths
cd input/paths
python
>>> import gdown
>>> url = "https://drive.google.com/u/0/uc?id=1MgkxIjKUVj8yfEvB1Zh7-QP0L9iKJbEl&export=download"
>>> output = "M17-metapath_CHNHC+NHCHN+RandWalk-whichmeta_100-num_walks_50-len_metapath.txt"
>>> gdown.download(url, output)
>>> exit()
cd ..
python
>>> import gdown
>>> url = "https://drive.google.com/u/0/uc?id=1MPZvz6PV5yisiu2cNPRsRzH-d0ZT57Ot&export=download"
>>> output = "node2fp_revised_1120.pickle"
>>> gdown.download(url, output)
>>> exit()
cd ..
```

## Run main.py

As per the usage example in the repo, run the following command:

```
python src/main.py --CSP_train --CSP_save
```

## Warning and error

Going through the above commands in sequence, I got the following warning and error.

Warning:

```
Creating a tensor from a list of numpy.ndarrays is extremely slow. Please consider converting the list to a single numpy.ndarray with numpy.array() before converting to a tensor. (Triggered internally at ../torch/csrc/utils/tensor_new.cpp:245.)
```

Let's (later) try to cast the "list of numpy.ndarrays to a single numpy.ndarray with numpy.array() before converting to a tensor."


Error:

```
Plot Embedding...

t-SNE Started... 
Traceback (most recent call last):
  File "/content/drive/MyDrive/AJX/FlavorGraph/src/main.py", line 52, in <module>
    main()
  File "/content/drive/MyDrive/AJX/FlavorGraph/src/main.py", line 44, in main
    plot_embedding(args, graph)
  File "/content/drive/MyDrive/AJX/FlavorGraph/src/plotter.py", line 46, in plot_embedding
    node_name2vec_tsne = load_TSNE(node_name2vec, dim=2)
  File "/content/drive/MyDrive/AJX/FlavorGraph/src/plotter.py", line 159, in load_TSNE
    X_tsne = tsne.fit_transform(X)
  File "/usr/local/lib/python3.10/dist-packages/sklearn/manifold/_t_sne.py", line 1118, in fit_transform
    self._check_params_vs_input(X)
  File "/usr/local/lib/python3.10/dist-packages/sklearn/manifold/_t_sne.py", line 828, in _check_params_vs_input
    if self.perplexity >= X.shape[0]:
AttributeError: 'list' object has no attribute 'shape'
```

This error happens in the FlavorGraph code at

```
File "/content/drive/MyDrive/AJX/FlavorGraph/src/plotter.py", line 159, in load_TSNE
    X_tsne = tsne.fit_transform(X)
```

Probably different in an earlier version of scikit-learn. But let's first try update code, starting at the error, instead of downgrading the environment.

## Update Code

Let's update the code:

```
foo = bar
```



