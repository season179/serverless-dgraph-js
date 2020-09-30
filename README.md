This repo is created to show fellow engineers who are helping with troubleshooting a gRPC issue that I'm facing.

Error:
```
offline: Failure: Failed to load /Users/season/Repos/serverless-dgraph-js/node_modules/grpc/src/node/extension_binary/node-v72-darwin-x64-unknown/grpc_node.node. Module did not self-register: '/Users/season/Repos/serverless-dgraph-js/node_modules/grpc/src/node/extension_binary/node-v72-darwin-x64-unknown/grpc_node.node'.
Error: Failed to load /Users/season/Repos/serverless-dgraph-js/node_modules/grpc/src/node/extension_binary/node-v72-darwin-x64-unknown/grpc_node.node. Module did not self-register: '/Users/season/Repos/serverless-dgraph-js/node_modules/grpc/src/node/extension_binary/node-v72-darwin-x64-unknown/grpc_node.node'.
```

## Steps to reproduce
1. run `npm install`
2. run `serverless install`
3. post a GraphQL mutation
```
mutation ($input: [UserInput!]!) {
  addUser(input: $input)
}
```
```
{
	"input": [
		{
			"name": "John",
			"age": 30
		}
	]
}
```
4. repeat step no. 3 and the error should show up.