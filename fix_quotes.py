with open('src/data/modules.ts', 'r') as f:
    content = f.read()

# Use template literal (backticks) for the question to avoid quote escaping issues
old = 'question: "You observe a contractor worker at an ADNOC site working at 2.5 meters height without fall protection. The worker says \\"I have done this job for 20 years, I do not need a harness.\\" What is your IMMEDIATE action?",'
new = 'question: `You observe a contractor worker at an ADNOC site working at 2.5 meters height without fall protection. The worker says "I have done this job for 20 years, I do not need a harness." What is your IMMEDIATE action?`,'

content = content.replace(old, new)

with open('src/data/modules.ts', 'w') as f:
    f.write(content)

print('Fixed with template literal')