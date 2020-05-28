yarn workspace @animavita/relay prepare:build
yarn workspace @animavita/expo prepare:build
yarn workspace @animavita/graphql prepare:build

yarn workspace @animavita/aws deploy AnimavitaStagingGraphQLStack \
  -c mode=staging \
  -c pkg=graphql \
  -c secretArn=$SECRET_ARN \
  --require-approval=never

yarn workspace @animavita/aws deploy AnimavitaStagingWebStack \
  -c mode=staging \
  -c pkg=web \
  -c secretArn=$SECRET_ARN \
  --require-approval=never
