---
title: 如何搭建本地的AgentGPT，并突破task最大限制
date: 2023-04-14 11:56:51
tags:
---

如果希望了解AgentGPT是什么？可以看其他同学的文章

## 体验AgentGPT

我们在体验[AgentGPT官网](https://agentgpt.reworkd.ai/)时会遇到一些限制：比如要求提供自己的APIKEY，或者在显示答案时几次结果后出现：

1. This agent has been running for too long (25 Loops). To save your wallet, and our infrastructure costs, this agent is shutting down. In the future, the number of iterations will be configurable.

2. "We're sorry, because this is a demo, we cannot have our agents running for too long. Note, if you desire longer runs, please provide your own API key in Settings. Shutting down."

这是因为AgentGPT限制了消息数量，如果用户提供了APIKEY：那么显示到第25个task则会出现第一条消息，并结束任务；如果没输入APIKEY：则会在第4个task时出现第二条。当我们希望自己突破限制，这时就只能自己搭建一个AgentGPT服务，并修改代码来解决。下面介绍一下如何部署已经修改代码绕过限制。

## Fork代码

访问AgentGPT的开源代码： https://github.com/reworkd/AgentGPT，然后点击右上角的fork，在自己的仓库中创建一份拷贝。

## 修改AgentGPT代码

现在将自己的代码clone下来，并进行一些调整：

### 官网要求用户填写自己OPENAI-APIKEY

`// index.tsx
`const [customApiKey, setCustomApiKey] = React.useState<string>("");`<SettingsDialog
  customApiKey={customApiKey}
  setCustomApiKey={setCustomApiKey}
  show={showSettingsDialog}
  close={() => setShowSettingsDialog(false)}
/>`

以上代码会让用户每次访问网站都输入ApiKey，官方并不会保存用户的key，只要关掉页面后就没了。我们希望自己的服务每次打开可以直接使用，而不需进行APIKEY

解决办法：不再渲染SettingDialog，注释掉SettingDialog代码

```
// index.tsx
{/*<SettingsDialog*/}
{/*  customApiKey={customApiKey}*/}
{/*  setCustomApiKey={setCustomApiKey}*/}
{/*  show={showSettingsDialog}*/}
{/*  close={() => setShowSettingsDialog(false)}*/}
{/*/>*/}
```

### 强制使用我们的OpenAI-APIKey

`// .env
OPENAI_API_KEY=changeme （这里替换成我们的key)`

但以上的配置只是官方在用户没有输入APIKEY时使用的内部key，我们需要修改下代码让服务直接使用这个

`utils/chain.ts`文件是发起openai接口的文件，这里有如下代码

`new OpenAI({
  openAIApiKey:
    customApiKey === "" ? process.env.OPENAI_API_KEY : customApiKey,
  temperature: 0.9,
  modelName: "gpt-3.5-turbo",
  maxTokens: 300,
});`

我们改成openAIApiKey: process.env.OPENAI_API_KEY

### 突破task限制

如开头说到，官网会对task的数量进行限制，我们希望自己来控制这个限制：

`// src/components/AutonomousAgent.tsthis.numLoops += 1;
const maxLoops = this.customApiKey === "" ? 4 : 25;
if (this.numLoops > maxLoops) {
  this.sendLoopMessage();
  this.shutdown();
  return;
}`

解决办法：修改这里的const maxLoopsd = ？比如100（建议设一个值，否则会一直执行下去）

## 项目部署

需要部署的服务器已经安装了docker，然后将代码clone到服务器中

修改setup.sh的权限为可执行: chmod u+x setup.sh

执行shell ./setup.sh --docker

shell中输入自己的APIKEY（会在docker容器中创建.env）

容器被创建并运行:

## 最终效果

![](https://images-service-1251417320.cos.ap-guangzhou.myqcloud.com/images/https3A2F2Fs3-us-west-2.png)