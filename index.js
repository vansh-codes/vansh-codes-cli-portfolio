#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import figlet from 'figlet';
import gradient from 'gradient-string';
import clear from 'clear';
import open from 'open';
import boxen from 'boxen';

// Clear the console
clear();

async function welcome() {
    const welcomeTitle = figlet.textSync('Welcome!', {
        font: 'Star Wars',
        horizontalLayout: 'fitted'
    });

    console.log(gradient.rainbow(welcomeTitle));
}

const socialLinks = {
    github: 'https://github.com/vansh-codes',
    linkedin: 'https://linkedin.com/in/vanshchaurasiya24',
    twitter: 'https://x.com/vanshchaurasiy4'
};

const projects = [
    {
        name: 'Portfolio',
        description: 'Web Portfolio!',
        github_link: 'https://github.com/vansh-codes/vansh-codes',
        live_link: 'https://vansh-codes.github.io'
    },
    {
        name: 'Quest Search',
        description: 'A modern fullstack application for searching questions in a large dataset efficiently.',
        github_link: 'https://github.com/vansh-codes/QuestSearch',
        live_link: 'https://questssearch.vercel.app/'
    },
    {
        name: 'E-Wood',
        description: 'Business Website for trading woods',
        github_link: 'https://github.com/vansh-codes/e-wood',
        live_link: 'https://e-wood.vercel.app'
    },
    {
        name: 'Cosmic Blast',
        description: 'This JavaScript game challenges players to defend Earth from asteroids.',
        github_link: 'https://github.com/vansh-codes/cosmic-blast',
        live_link: 'https://cosmic-blast.vercel.app'
    },
    {
        name: 'Web Annotation Tool',
        description: 'Browser extension for annotating webpages with drawing tools. Customize annotations and save screenshots effortlessly',
        github_link: 'https://github.com/vansh-codes/web-annotation-tool'
    }
];

async function aboutMe() {
    console.log(chalk.cyan(boxen(
        `Hi! I'm Vansh Chaurasiya\n\n${chalk.white('💻 Full Stack Developer')}\n${chalk.white('🌟 Passionate about creating amazing things')}\n${chalk.white('🎯 Always learning and growing')}`,
        { padding: 1, borderStyle: 'round', borderColor: 'cyan' }
    )));
}

async function showProjects() {
    const projectList = projects.map(project => ({
        name: chalk.cyan(project.name),
        value: project
    }));

    const { selectedProject } = await inquirer.prompt({
        type: 'list',
        name: 'selectedProject',
        message: 'Check out my projects:',
        choices: [...projectList, { name: chalk.gray('Go back'), value: 'back' }]
    });

    if (selectedProject === 'back') return;

    console.log(chalk.cyan.bold('\nProject Details:'));
    console.log(chalk.white(`Name: ${selectedProject.name}`));
    console.log(chalk.white(`Description: ${selectedProject.description}`));
    if (selectedProject.live_link) console.log(chalk.blue(`Live Link: ${selectedProject.live_link}`));
    console.log(chalk.blue(`GitHub Link: ${selectedProject.github_link}`));

    const { openLink } = await inquirer.prompt({
        type: 'confirm',
        name: 'openLink',
        message: 'Would you like to visit the project?'
    });

    if (openLink) {
        await open(selectedProject.github_link);
    }
}

async function contact() {
    console.log(chalk.cyan(boxen(
        `📧 Email: vanshchaurasiya1557+cliportfolio@gmail.com\n${chalk.white('Feel free to reach out!')}`,
        { padding: 1, borderStyle: 'round', borderColor: 'cyan' }
    )));

    const { platform } = await inquirer.prompt({
        type: 'list',
        name: 'platform',
        message: 'Connect with me on:',
        choices: [
            { name: 'GitHub', value: 'github' },
            { name: 'LinkedIn', value: 'linkedin' },
            { name: 'Twitter', value: 'twitter' },
            { name: 'Go back', value: 'back' }
        ]
    });

    if (platform !== 'back') {
        await open(socialLinks[platform]);
    }
}

async function main() {
    await welcome();

    while (true) {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to know?',
            choices: [
                { name: 'About Me', value: 'about' },
                { name: 'Projects', value: 'projects' },
                { name: 'Contact', value: 'contact' },
                { name: 'Exit', value: 'exit' },
            ]
        });

        switch (action) {
            case 'about':
                await aboutMe();
                break;
            case 'projects':
                await showProjects();
                break;
            case 'contact':
                await contact();
                break;
            case 'exit':
                console.log(chalk.cyan('\nThank you for visiting my portfolio! 👋'));
                process.exit(0);
        }
    }
}

process.on('SIGINT', () => {
    console.log("\n👋 Exiting CLI...");
    process.exit(0);
});

main().catch((error) => {
    if (error.isTtyError) {
        console.error("🚨 Terminal doesn't support interactive prompts.");
    } else if (error.message.includes('User force closed the prompt')) {
        console.log("\n👋 Adios!");
        process.exit(0);
    } else {
        console.error("❌ Unexpected error:", error);
    }
});