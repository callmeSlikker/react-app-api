responseArray = result.stdout.strip().split('\n')
print("responseArray"+ responseArray)
parsedApiResults = json.loads(responseArray[6].split(".py ")[1])
print("parsedApiResults"+ parsedApiResults)