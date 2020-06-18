#!/bin/bash

# Copy Rasbian specific libraries:
# These need to be copied in to the `lib` directory before building the picam image
# Not adding these libraries to the repository to avoid any possible licensing issues
# lib is gitignored

mkdir -p lib
cp /opt/vc/lib/*.so lib/