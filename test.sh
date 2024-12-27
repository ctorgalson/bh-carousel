#!/usr/bin/env bash

function cleanup {
  kill %1
}

trap EXIT cleanup

npm run serve &>/dev/null &

npm run test:cli && cleanup
