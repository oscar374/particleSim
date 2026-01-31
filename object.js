

export default class object {
    constructor(x, y, z, color, mass){
        let outPosition = new Vector3(0, 0, 0);
        
        function update(deltaTime, otherObjects){
             
        }
    }
}


// To calculate the movement vector when multiple gravitational forces are applied, you'll want to use vector addition of individual gravitational forces.
// Here's the approach:
// The Core Equation
// F_total = F₁ + F₂ + F₃ + ... + Fₙ
// Where each force F is calculated using Newton's law of gravitation:
// F = G × (m₁ × m₂) / r²
// But since force is a vector, you need to calculate it in component form for each object.
// Step-by-Step Process
// For each gravitational source:

// Calculate the direction vector from your object to the gravitational source:

// dx = x_source - x_object
// dy = y_source - y_object
// (dz = z_source - z_object, if in 3D)


// Calculate the distance: r = √(dx² + dy² + dz²)
// Calculate the force magnitude: F_mag = G × (m₁ × m₂) / r²
// Get the unit direction vector:

// unit_x = dx / r
// unit_y = dy / r
// unit_z = dz / r


// Get force components:

// Fx = F_mag × unit_x
// Fy = F_mag × unit_y
// Fz = F_mag × unit_z


// Sum all forces from all gravitational sources:

// F_total_x = ΣFx
// F_total_y = ΣFy
// F_total_z = ΣFz


// Calculate acceleration: a = F_total / m_object
// Update velocity: v_new = v_old + a × Δt
// Update position: pos_new = pos_old + v_new × Δt

// This gives you the movement vector resulting from multiple gravitational influences simultaneously.