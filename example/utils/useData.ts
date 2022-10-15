import { useState, useCallback, useEffect } from "react";

export function useData<T>(initialValue: T, newValue: T): [T, (key: string, value: any) => void, boolean, () => void] {
    const [data, setData] = useState<T>(initialValue);

    const [refreshing, setRefreshing] = useState<boolean>(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            setData(newValue);
            setRefreshing(false);
        }, 1000);
    }, []);

    const updateData = (key: string, value: any): void => {
        console.log('updateData', key, value);
        setData({
            ...data,
            [key]: value,
        });
    }

    useEffect(() => {
        onRefresh();
    }, []);

    return [data, updateData, refreshing, onRefresh];
}