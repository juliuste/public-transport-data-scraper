# Legacy proxy

The docker image defined in this directory is deployed to our [shared infrastructure](https://github.com/public-transport/infrastructure) and exposes a legacy proxy which forwards all requests to old dataset URLs to their latest equivalent.

This service only exists for backwards compatibility and might be shut down in the future, users should always use the latest endpoints in their projects.
