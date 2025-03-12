import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('MockUSDC', (m) => {
  const args: any[] = [];
  const MockUSDC = m.contract('MockUSDC', args, {});

  return { MockUSDC };
});
