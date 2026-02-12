import DecisionTreeEngine from './DecisionTreeEngine';
import { WALLET_TREE } from '@/data/decision-trees';

export default function DecisionTreeWallet() {
  return <DecisionTreeEngine {...WALLET_TREE} />;
}
