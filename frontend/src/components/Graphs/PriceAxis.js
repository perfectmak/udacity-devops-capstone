import React from 'react';
import { formatCurrency } from '../../util/currency-utils';

export const PriceAxis = (tick) => {
  return (
    <g transform={`translate(${tick.x-3},${tick.y})`}>
      <text
        textAnchor="end"
        dominantBaseline="middle"
        style={{
          fontSize: 10,
        }}
      >
        {formatCurrency(tick.value, { includeCurrency: true, currency: '₦' })}
      </text>
    </g>
  );
}