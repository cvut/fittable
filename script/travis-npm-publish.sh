#!/bin/bash

pkg-get() {
    node -p "require('./package.json').$1"
}

pkg-repo-slug() {
    pkg-get "repository.url.split('/').splice(-2).join('/')"
}

is-released() {
    res="$(npm view $1@$2 version 2>/dev/null | head -n 1)"
    [ $? == 0 ] && [ "$res" == "$2" ]; return 0
}


if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
    echo "This is a pull request, skipping deploy."; exit 0
fi

if [ "$TRAVIS_REPO_SLUG" != "$(pkg-repo-slug)" ]; then
    echo "This is a fork, skipping deploy."; exit 0
fi

if [ "$TRAVIS_BRANCH" != "master" ]; then
    echo "This is not the master branch, skipping deploy."; exit 0
fi

if [ "$TRAVIS_BUILD_NUMBER.1" != "$TRAVIS_JOB_NUMBER" ]; then
    echo "This is not a first job of the build, skipping deploy."; exit 0
fi

version=$(pkg-get version)
if is-released $(pkg-get name) $version; then
    version="${version}-dev.$(date +%y%m%d)${TRAVIS_BUILD_NUMBER}"
    npm version $version --no-git-tag-version 1>/dev/null
fi

echo "Publishing version $version to the npm registry."
npm publish
