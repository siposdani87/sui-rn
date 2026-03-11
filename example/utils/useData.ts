import { useState, useCallback, useEffect, useRef } from 'react';

export function useData<T extends object>(
    initialValue: T,
    newValue: T,
): [T, (key: keyof T, value: T[keyof T]) => void, boolean, () => void] {
    const [data, setData] = useState<T>(initialValue);
    const newValueRef = useRef(newValue);

    const [refreshing, setRefreshing] = useState<boolean>(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            setData(newValueRef.current);
            setRefreshing(false);
        }, 1000);
    }, []);

    const updateData = useCallback(
        (key: keyof T, value: T[keyof T]): void => {
            console.log('updateData', key, value);
            setData((prev) => ({
                ...prev,
                [key]: value,
            }));
        },
        [],
    );

    useEffect(() => {
        onRefresh();
    }, [onRefresh]);

    return [data, updateData, refreshing, onRefresh];
}
