import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ParamSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  description?: string;
  onChange?: (value: number) => void;
  className?: string;
}

export const ParamSlider: React.FC<ParamSliderProps> = ({
  label,
  value: initialValue,
  min,
  max,
  step,
  description,
  onChange,
  className
}) => {
  const [value, setValue] = useState(initialValue);

  const handleValueChange = (newValue: number[]) => {
    const val = newValue[0];
    setValue(val);
    onChange?.(val);
  };

  const formatValue = (val: number) => {
    if (val < 0.001) {
      return val.toExponential(2);
    } else if (val < 1) {
      return val.toFixed(4);
    } else {
      return val.toString();
    }
  };

  return (
    <Card className={`${className || ''}`}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* 标签和值 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">{label}</label>
              {description && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-sm">{description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <div className="text-sm font-mono bg-muted px-2 py-1 rounded">
              {formatValue(value)}
            </div>
          </div>

          {/* 滑块 */}
          <Slider
            value={[value]}
            onValueChange={handleValueChange}
            min={min}
            max={max}
            step={step}
            className="w-full"
          />

          {/* 范围指示 */}
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatValue(min)}</span>
            <span>{formatValue(max)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};