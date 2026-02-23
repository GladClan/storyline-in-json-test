import storylineData from './lib/resources/storyline-test.json';
import StorylineData, { Option } from './lib/resources/storyline-type';
import characters from './lib/resources/etc/characters.json';
import { pointerType, start, findRef } from './lib/scripts/pointerFunctions';
import { color } from './lib/resources/etc/consoleColors';

import pressAnyKey from 'press-any-key';
// import { createInterface } from 'node:readline';
// import { promisify } from 'node:util';

// const rl = createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
// const questionPromisified = promisify(rl.question).bind(rl);

const data = storylineData as unknown as StorylineData;
const pointers: pointerType = start(data);

async function main() {
    while (true) {
        const currentNode = data[pointers["scene-number"]].content[pointers["ref-current"]];
        if (!currentNode) {
            console.error("Missing content for ref:", pointers["ref-current"]);
            break;
        }
        for (const item of currentNode.chat) {
            if (characters.ambient.includes(item.source))
                await say(color.grey + item.dialogue + color.default);
            else if (characters.party.includes(item.source))
                await say(color.blue + item.dialogue + color.default);
            else await say(color.red + item.dialogue + color.default);
        }
        if (currentNode.options && currentNode.options.length > 0) {
            const ref = await optionSelector(currentNode.options)
            findRef(pointers, ref, data);
        } else if (currentNode.fight) {
            //
        }
    }
}

main().catch(console.error);

async function say(script: string) {
    const { default: inquirer } = await import('inquirer');
    
    try {
        await inquirer.prompt([{
            type: 'input',
            name: 'continue',
            message: script + "\n(Press Enter to continue)"
        }]);
    } catch (err) {
        console.error('Interrupted', err);
        process.exit(1);
    }
}

async function optionSelector(options: Option[]): Promise<string> {
    const { default: inquirer } = await import('inquirer');

    const choice = await inquirer.prompt([{
        type: 'rawlist',
        name: 'selectedOptions',
        message: 'What will you do? (Use Arrow keys or numbers to select, Enter to confirm)',
        choices: options.map((option) => option.title)
    }])

    const selectedTitle = choice.selectedOptions;
    const selectedOption = options.find(option => option.title === selectedTitle);
    return selectedOption?.ref || '';
}

/**
 * Until the storyline finishes, run a loop that displays the dialogue and options and finds the next prompt when the option is chosen.
 * If there are multiple dialogues, the user will scroll through them until they finish and the user is presented with the choice.
 * On fight, the loop transfers to the fight sequence until the fight is finished--if the next-scene parameter is true, it moves to the next scene,
 *  otherwise it transfers to the designated ref
 * 
 */

/**
 * to change the console text color:
 * 
 * Syntax: \033[<color_code>m followed by your text.
 * Reset: Append the reset code \033[0m to return to default colors for subsequent output. 
 * Common Foreground Color Codes:
     * Color 	Code
     * Black	30
     * Red	31
     * Green	32
     * Yellow	33
     * Blue	34
     * Magenta	35
     * Cyan	36
     * White	37
     * Reset	0
     * Bold/Bright	1 (can be combined, e.g., 1;32m for bright green)
 */