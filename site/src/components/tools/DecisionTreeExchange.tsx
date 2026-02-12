import DecisionTreeEngine from './DecisionTreeEngine';
import { EXCHANGE_TREE } from '@/data/decision-trees';

export default function DecisionTreeExchange() {
  return <DecisionTreeEngine {...EXCHANGE_TREE} />;
}
