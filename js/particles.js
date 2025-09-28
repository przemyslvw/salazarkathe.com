// Particle System for Hero Section
export class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100; // Increased number of particles
        this.colors = [
            '255, 107, 107',    // Red
            '78, 205, 196',     // Teal
            '255, 209, 102',    // Yellow
            '160, 94, 181',     // Purple
            '106, 176, 76',     // Green
            '255, 138, 91'      // Orange
        ];
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        for (let i = 0; i < this.particleCount; i++) {
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                radius: Math.random() * 3 + 1,
                baseRadius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.6 + 0.2,
                color: color,
                baseX: Math.random() * this.canvas.width,
                baseY: Math.random() * this.canvas.height,
                angle: Math.random() * Math.PI * 2,
                speed: 0.1 + Math.random() * 0.1,
                distance: 20 + Math.random() * 50
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Create gradient for the entire canvas
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2,
            this.canvas.height / 2,
            0,
            this.canvas.width / 2,
            this.canvas.height / 2,
            Math.max(this.canvas.width, this.canvas.height) / 2
        );
        gradient.addColorStop(0, 'rgba(26, 31, 46, 0.1)');
        gradient.addColorStop(1, 'rgba(9, 10, 15, 0.3)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            // Create a floating effect
            particle.angle += particle.speed * 0.02;
            particle.x = particle.baseX + Math.cos(particle.angle) * particle.distance;
            particle.y = particle.baseY + Math.sin(particle.angle) * particle.distance;
            
            // Pulsing effect
            particle.radius = particle.baseRadius + Math.sin(Date.now() * 0.001 + index) * 0.5;
            
            // Keep particles within bounds with smooth return
            if (particle.x < -particle.radius) particle.x = this.canvas.width + particle.radius;
            if (particle.x > this.canvas.width + particle.radius) particle.x = -particle.radius;
            if (particle.y < -particle.radius) particle.y = this.canvas.height + particle.radius;
            if (particle.y > this.canvas.height + particle.radius) particle.y = -particle.radius;
            
            // Draw particle with glow effect
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.radius * 2
            );
            gradient.addColorStop(0, `rgba(${particle.color}, 0.8)`);
            gradient.addColorStop(1, `rgba(${particle.color}, 0.1)`);
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius * 1.5, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            // Draw connecting lines between nearby particles
            this.particles.slice(index + 1).forEach(p2 => {
                const dx = particle.x - p2.x;
                const dy = particle.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 150})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        new ParticleSystem(canvas);
    }
});
