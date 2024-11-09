/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import type { SelectProps } from 'antd';
// import debounce from 'lodash/debounce';

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

export default function DebounceSelect<
  ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any,
>({ fetchOptions, debounceTimeout = 800, ...props }: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timer: NodeJS.Timeout;
  
    return function(...args: Parameters<T>) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}