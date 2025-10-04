import { useEffect, useRef } from "react";

export default function NightSkyCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let stars = [];
    let shootingStars = [];
    let time = 0;
    let lastShootingStarTime = 0;

    const resizeCanvas = () => {
      const devicePixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(devicePixelRatio, devicePixelRatio);
      initStars();
    };

    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.8;
        this.size = 0.5 + Math.random() * 2;
        this.twinkleSpeed = 0.01 + Math.random() * 0.05;
        this.twinklePhase = Math.random() * Math.PI * 2;
        const colorRoll = Math.random();
        if (colorRoll > 0.9) {
          this.color = `hsl(${210 + Math.random() * 30}, 100%, 80%)`;
        } else if (colorRoll > 0.8) {
          this.color = `hsl(${40 + Math.random() * 20}, 100%, 85%)`;
        } else {
          this.color = `hsl(0, 0%, ${90 + Math.random() * 10}%)`;
        }
      }
      draw(ctx, time) {
        const twinkle =
          Math.sin(time * this.twinkleSpeed + this.twinklePhase) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(
          this.x,
          this.y,
          this.size * (0.5 + twinkle * 0.5),
          0,
          Math.PI * 2
        );
        ctx.fillStyle = this.color;
        ctx.fill();
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size * 4
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${0.3 * twinkle})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    class ShootingStar {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.5;
        this.length = 50 + Math.random() * 100;
        this.angle = Math.PI / 4 + (Math.random() * Math.PI) / 2;
        this.speed = 5 + Math.random() * 15;
        this.opacity = 1;
        this.trail = [];
      }
      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.trail.unshift({ x: this.x, y: this.y, opacity: 1 });
        if (this.trail.length > 20) this.trail.pop();
        for (let i = 0; i < this.trail.length; i++) this.trail[i].opacity -= 0.05;
        this.trail = this.trail.filter((point) => point.opacity > 0);
        return (
          this.x < 0 ||
          this.x > canvas.width ||
          this.y < 0 ||
          this.y > canvas.height ||
          this.trail.length === 0
        );
      }
      draw(ctx) {
        for (let i = 0; i < this.trail.length - 1; i++) {
          const point = this.trail[i];
          const nextPoint = this.trail[i + 1];
          const gradient = ctx.createLinearGradient(
            point.x, point.y, nextPoint.x, nextPoint.y
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${point.opacity})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, ${nextPoint.opacity})`);
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        if (this.trail.length > 0) {
          const head = this.trail[0];
          const gradient = ctx.createRadialGradient(
            head.x, head.y, 0, head.x, head.y, 10
          );
          gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.beginPath();
          ctx.arc(head.x, head.y, 10, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(head.x, head.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 1)";
          ctx.fill();
        }
      }
    }

    const initStars = () => {
      stars = [];
      const starCount = Math.min(
        300,
        Math.floor((canvas.width * canvas.height) / 3000)
      );
      for (let i = 0; i < starCount; i++) stars.push(new Star());
    };

    const drawMoon = (ctx, time) => {
      const moonX = canvas.width * 0.8;
      const moonY = canvas.height * 0.3;
      const moonRadius = Math.min(canvas.width, canvas.height) * 0.1;
      const outerGlow = ctx.createRadialGradient(
        moonX, moonY, moonRadius * 0.9, moonX, moonY, moonRadius * 3
      );
      outerGlow.addColorStop(0, "rgba(255, 255, 230, 0.3)");
      outerGlow.addColorStop(1, "rgba(255, 255, 230, 0)");
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius * 3, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();
      const gradient = ctx.createRadialGradient(
        moonX - moonRadius * 0.3, moonY - moonRadius * 0.3,
        0, moonX, moonY, moonRadius
      );
      gradient.addColorStop(0, "rgba(255, 255, 230, 1)");
      gradient.addColorStop(0.7, "rgba(255, 255, 210, 1)");
      gradient.addColorStop(1, "rgba(240, 240, 190, 1)");
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      drawMoonCraters(ctx, moonX, moonY, moonRadius);
      const shine = Math.sin(time * 0.2) * 0.5 + 0.5;
      const innerGlow = ctx.createRadialGradient(
        moonX - moonRadius * 0.3, moonY - moonRadius * 0.3,
        0, moonX, moonY, moonRadius
      );
      innerGlow.addColorStop(0, `rgba(255, 255, 255, ${0.2 + shine * 0.1})`);
      innerGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fillStyle = innerGlow;
      ctx.fill();
    };

    const drawMoonCraters = (ctx, moonX, moonY, moonRadius) => {
      const craters = [
        { x: -0.2, y: -0.3, size: 0.15 }, { x: 0.3, y: 0.2, size: 0.1 },
        { x: -0.1, y: 0.4, size: 0.12 }, { x: 0.4, y: -0.4, size: 0.08 },
        { x: -0.4, y: 0.1, size: 0.1 }, { x: 0.1, y: -0.1, size: 0.2 },
        { x: -0.3, y: -0.4, size: 0.07 }, { x: 0.2, y: 0.3, size: 0.09 }
      ];
      craters.forEach((crater) => {
        const x = moonX + crater.x * moonRadius,
          y = moonY + crater.y * moonRadius,
          size = crater.size * moonRadius;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, "rgba(210, 210, 190, 1)");
        gradient.addColorStop(1, "rgba(230, 230, 210, 0.8)");
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    };

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGradient.addColorStop(0, "#0a1a2a");
      skyGradient.addColorStop(0.5, "#0c2a4a");
      skyGradient.addColorStop(1, "#0a1a2a");
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => star.draw(ctx, time));
      drawMoon(ctx, time);
      const now = Date.now();
      if (now - lastShootingStarTime > 2000 && Math.random() < 0.03) {
        shootingStars.push(new ShootingStar());
        lastShootingStarTime = now;
      }
      shootingStars = shootingStars.filter((star) => {
        const isComplete = star.update();
        star.draw(ctx);
        return !isComplete;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
