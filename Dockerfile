FROM meteorhacks/meteord:onbuild
RUN apt-get update && apt-get install -yq git
