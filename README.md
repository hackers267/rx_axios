# RxAxios

RxAxios是一个使用`rxjs`对`axios`的包装库。其主要目的是减少在代码中把`axios`转换为`Observable`的步骤。

## 使用

```shell
pnpm add @silence_zhpf/rx_axios
```

```ts
import rxAxios from "@silence_zhpf/rx_axios";

rxAxios.get("/api").subscribe(x => {
    console.log(x)
})

```

默认导出一个`RxAxios`实例，如果想要自定义实例，可以使用导出的`RxAxios`的`of`方法创建一个自己的`RxAxios`实例。

```ts
import {RxAxios} from '@silence_zhpf/rx_axios';

const rxAxios = RxAxios.of({baseURL: '/api'})
```

目前，`rxAxios`支持四个请求方法：

* get
* post
* delete
* put
