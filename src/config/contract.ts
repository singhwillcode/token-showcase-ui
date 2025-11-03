
export const CONTRACT_ADDRESS = "0x082c565e9d7500eeb3f5fa89903a98228cd7eeeb"; 

export const CONTRACT_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() pure returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function founder() view returns (address)",
  "function isFrozen(address user) view returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function transfer(address recipient, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address sender, address recipient, uint256 amount) returns (bool)",
  "function increaseAllowance(address spender, uint256 addedValue) returns (bool)",
  "function decreaseAllowance(address spender, uint256 subtractedValue) returns (bool)",
  "function burn(uint256 amount)",
  "function burnFrom(address account, uint256 amount)",
  "function tokenBurning(uint256 amount)",
  "function freezeId(address user)",
  "function unfreezeId(address user)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
  "event Frozen(address indexed user)",
  "event Unfrozen(address indexed user)"
];

export const SEPOLIA_CHAIN_ID = "0xaa36a7"; // 11155111 in hex
export const SEPOLIA_RPC_URL = "https://sepolia.infura.io/v3/";
