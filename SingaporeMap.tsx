
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { LOCATIONS } from '../../constants';
import { MapLocation } from '../../types';

interface SingaporeMapProps {
  onSelect: (loc: MapLocation) => void;
  selectedId?: string;
}

const SingaporeMap: React.FC<SingaporeMapProps> = ({ onSelect, selectedId }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Clear previous
    d3.select(containerRef.current).select('svg').remove();

    const svg = d3.select(containerRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('class', 'overflow-visible');

    // Simple path for Singapore outline
    const projection = d3.geoMercator()
      .center([103.851959, 1.290270]) // Singapore Center
      .scale(width * 100)
      .translate([width / 2, height / 2]);

    const pathGenerator = d3.geoPath().projection(projection);

    // Render placeholder base for Singapore
    svg.append('path')
      .attr('d', "M10,200 L50,150 L150,100 L300,80 L450,100 L550,150 L580,250 L500,350 L200,380 L50,300 Z") // Mock path since we can't fetch external geojson
      .attr('class', 'fill-gray-200 stroke-gray-300 stroke-1');

    // Markers
    LOCATIONS.forEach(loc => {
      const [x, y] = projection(loc.coords) as [number, number];
      
      const pinColor = loc.sessions[0].current / loc.sessions[0].total >= 1 ? '#ef4444' : (loc.sessions[0].current / loc.sessions[0].total > 0.7 ? '#f59e0b' : '#22c55e');

      const g = svg.append('g')
        .attr('class', 'cursor-pointer transition-transform duration-200 hover:scale-125')
        .on('click', () => onSelect(loc));

      // Pin shape
      g.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', selectedId === loc.id ? 10 : 6)
        .attr('fill', pinColor)
        .attr('stroke', 'white')
        .attr('stroke-width', 2);
      
      if (selectedId === loc.id) {
          g.append('circle')
            .attr('cx', x)
            .attr('cy', y)
            .attr('r', 15)
            .attr('fill', 'none')
            .attr('stroke', pinColor)
            .attr('stroke-width', 2)
            .attr('class', 'animate-ping');
      }

      g.append('text')
        .attr('x', x)
        .attr('y', y - 15)
        .attr('text-anchor', 'middle')
        .attr('class', 'text-[10px] font-black uppercase tracking-tighter fill-gray-900 select-none')
        .text(loc.name);
    });

  }, [onSelect, selectedId]);

  return <div ref={containerRef} className="w-full h-full min-h-[400px]" />;
};

export default SingaporeMap;
