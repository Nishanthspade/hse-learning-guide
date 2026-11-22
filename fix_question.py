with open('src/data/modules.ts', 'r') as f:
    lines = f.readlines()

# Fix line 320 (index 319)
lines[319] = '    question: `You observe a contractor worker at an ADNOC site working at 2.5 meters height without fall protection. The worker says "I have done this job for 20 years, I do not need a harness." What is your IMMEDIATE action?`,\n'

with open('src/data/modules.ts', 'w') as f:
    f.writelines(lines)

print('Fixed line 320')