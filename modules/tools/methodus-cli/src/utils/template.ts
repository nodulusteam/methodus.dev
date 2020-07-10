import * as ejs from 'ejs';
import * as path from 'path';

export interface TemplateData {
    projectName?: string;
    projectNameCamel?: string;
    componentName?: string;
}

export function camelCaseToDash(str: string) {
    return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}

export function render(content: string, data: TemplateData) {
    return ejs.render(content, data);
}

export function getTemplateConfig(
    templatePath: string
): TemplateConfig {
    const configPath = path.join(templatePath, '.template.js');

    const templateConfigContent = require(configPath);

    if (templateConfigContent) {
        return templateConfigContent;
    }

    return { args: []};
}

export interface TemplateConfig {
    isProject?: boolean;
    createDir?: boolean;
    baseOutput?: string;
    args: any[];
    files?: string[];
    postMessage?: string;
}

export interface CliOptions {
    projectName: string;
    templateName: string;
    templatePath: string;
    tartgetPath: string;
    config: TemplateConfig;
}
