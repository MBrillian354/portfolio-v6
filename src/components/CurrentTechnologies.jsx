import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';

const CurrentTechnologies = ({ technologies }) => {
    const [hoveredCard, setHoveredCard] = useState(null);

    // Get all technologies from all categories
    const allTechnologies = [
        ...(technologies.frontend || []),
        ...(technologies.backend || []),
        ...(technologies.dataScience || [])
    ];

    return (
        <section id="current-technologies" className="section-padding">
            <div className="section-container">
                <div className="px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {allTechnologies.map((tech, index) => {
                            const cardId = `tech-${index}`;
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
            </div>
        </section>
    );
};

export default CurrentTechnologies;
