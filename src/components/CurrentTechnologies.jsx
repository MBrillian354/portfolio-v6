import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';

const CurrentTechnologies = ({ technologies }) => {
    const [hoveredCard, setHoveredCard] = useState(null);

    const techCategories = [
        {
            key: 'frontend',
            title: 'Frontend',
            items: technologies.frontend,
            gradient: 'card-gradient-blue'
        },
        {
            key: 'backend',
            title: 'Backend',
            items: technologies.backend,
            gradient: 'card-gradient-green'
        },
        {
            key: 'dataScience',
            title: 'Data Science',
            items: technologies.dataScience,
            gradient: 'card-gradient-blue'
        },
        {
            key: 'tools',
            title: 'Tools & Platforms',
            items: technologies.tools,
            gradient: 'card-gradient-green'
        }
    ];

    return (
        <section id="current-technologies" className="section-padding">
            <div className="section-container">
                <div className="flex flex-col gap-8">
                    {techCategories.map((category) => (
                        <div
                            key={category.key}
                            className="px-4"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {category.items.map((tech, index) => {
                                    const cardId = `${category.key}-${index}`;
                                    return (
                                        <div
                                            key={index}
                                            className={`card-hover-group card-static transition-all duration-300 ease-out ${
                                                hoveredCard && hoveredCard !== cardId ? 'opacity-50' : ''
                                            }`}
                                            onMouseEnter={() => setHoveredCard(cardId)}
                                            onMouseLeave={() => setHoveredCard(null)}
                                        >
                                            <div className="flex items-center justify-start">
                                                <i className={`pr-8`}>
                                                    <Icon icon={tech.icon} width={36} height={36} />
                                                </i>
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-3">
                                                        <h4 className="card-title text-base">
                                                            {tech.name}
                                                        </h4>
                                                    </div>
                                                    <span className="text-xs">
                                                        {tech.category}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CurrentTechnologies;
