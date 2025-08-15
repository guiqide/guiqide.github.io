---
title: 如何替换apollo-client的request-accept
date: 2021-03-3 17:03:28
tags:
---

当服务端依赖accept的配置，返回不同信息时，我们需要在client端修改accept。
apollo-link也提供了operation的setContext方法来修改headers对象。
但你会发现我们配的accept，并不是替换，而是在默认的配置`*/*`后面进行添加，导致服务端因为优先的规则，返回html，而不是我们的期望的`application/json`，
而且只有这一个api的地方可以修改headers，其他的方式都不起效，最后发现如果用自定义的fetch就可以避免被替换headers，这可能导致后面设置的setContext不起效，不过我们可以在自定义fetch中设置，所以这个方法可行，
以下是apolloProvider的实现代码：

```
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';

const customFetch = (_, options) => {
  const accept = 'application/json',

  options.headers.accept = accept;
  return fetch(`${process.env.VUE_APP_SERVER_API}/api/graphql`, options);
};

const httpLink = createHttpLink({
  uri: `${process.env.VUE_APP_SERVER_API}/api/graphql`,
  useGETForQueries: false,
  fetch: customFetch,
});

const middlewareLink = new ApolloLink((operation, forward) => forward(operation));

const apolloClient = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache,
  clientState: {
    defaults: {},
    resolvers: {},
  },
  onError: ({ response, networkError }) => {
    Raven.setExtraContext({
      networkError,
      response,
    });
    console.error(response, networkError);
    return response;
  },
  connectToDevTools: true,
});
export { apolloClient as default };

```