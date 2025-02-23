## Get started

- Connect your wallet to Gaianet.
- Select a domain and start interacting with the agent.

## Contributing

### Run a node on AWS

- Launch a `t4g-xlarge` (or instance type with at least 16GB RAM) instance with `GaiaNet_ubuntu22.04_arm64` AMI.
- Make sure that SSH connections are allowed for the instance.
- SSH into the instance.
- Initialize a Gaia node with Qwen2-0.5b-instruct model.
  ```bash
  gaianet init --config https://raw.githubusercontent.com/GaiaNet-AI/node-configs/main/qwen2-0.5b-instruct/config.json
  gaianet config --chat-ctx-size 32000
  gaianet start
  ```

### Join the domain

- Register the node in Gaianet.
- Ensure that the node meets the domain’s requirements, using the same configuration provided above.
- Submit a join request to our domain.
