# @siposdani87/sui-rn

[![Version](https://img.shields.io/npm/v/@siposdani87/sui-rn.svg?style=square)](https://www.npmjs.com/package/@siposdani87/sui-rn)
[![Download](https://img.shields.io/npm/dt/@siposdani87/sui-rn.svg?style=square)](https://www.npmjs.com/package/@siposdani87/sui-rn)
[![License](https://img.shields.io/npm/l/@siposdani87/sui-rn.svg?style=square)](./LICENSE)

<a href="https://www.buymeacoffee.com/siposdani87" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" style="width: 150px !important;"></a>

This is a basic UI library. It is written in the TypeScript language. The codebase was ready to use with Expo and React Native. In this library there are a lot of predefined form field components.

## Getting Started

### Installing

```
npm install @siposdani87/sui-rn

# Expo
expo install @siposdani87/sui-rn
```

### Basic Usage

Check example directory for more samples and options.

```js
import React, { useState } from 'react';
import { View } from 'react-native';
import { TextField } from '@siposdani87/sui-rn';

export SampleScreen = () => {
    const [data, setData] = useState({
        name: '',
    });

    function updateData(key: string, value: string) {
        setData({
            ...data,
            [key]: value,
        });
    }

    return (
        <View>
            <TextField
                label="Name"
                value={data.name}
                onValueChange={(v) => updateData('name', v)}
            />
        </View>
    );
}
```

## Preview
![Overview](https://raw.githubusercontent.com/siposdani87/sui-rn/master/images/sui-rn.png)

## Bugs or Requests

If you encounter any problems feel free to open an [issue](https://github.com/siposdani87/sui-rn/issues/new?template=bug_report.md). If you feel the library is missing a feature, please raise a [ticket](https://github.com/siposdani87/sui-rn/issues/new?template=feature_request.md). Pull request are also welcome.
